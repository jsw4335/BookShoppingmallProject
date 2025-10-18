const conn = require("../mariadb"); //db모듈
const { StatusCodes } = require("http-status-codes"); //status code모듈
const jwt = require("jsonwebtoken"); //jwt 모듈
const crypto = require("crypto"); // crypto 모듈 : 암호화
const dotenv = require("dotenv"); //dotenv모듈
dotenv.config();

const join = (req, res) => {
    const { email, password } = req.body;

    let sql = "INSERT INTO users (email, password, salt) VALUES(?, ?, ?)";

    //회원가입 시 비밀번호를 암호화해서 암호환된 비밀번호와, salt 값을 같이 저장
    const salt = crypto.randomBytes(10).toString("base64");
    const hashPassword = crypto
        .pbkdf2Sync(password, salt, 10000, 10, "sha512")
        .toString("base64");

    //로그인 시, 이메일& 비밀번호(날 것) => salt 값 꺼내서 비밀번호 암호화 해보고 => 디비 비밀번호랑 비교

    let values = [email, hashPassword, salt];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD request
        }
        return res.status(StatusCodes.CREATED).json(results); //설계에서 아직 res.body에 아무것도 전달하지 않는다고 적어놓긴함
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    let sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        const loginUser = results[0]; //어차피 email을 가진 사람이 1명이라 0번째를 가져다 쓰면 된다
        // salt값 꺼내서 날 것으로 들어온 비밀번호를 암호화 해보고
        const hashPassword = crypto
            .pbkdf2Sync(password, loginUser.salt, 10000, 10, "sha512")
            .toString("base64");

        if (loginUser && loginUser.password == hashPassword) {
            const token = jwt.sign(
                {
                    email: loginUser.email,
                },
                process.env.PRIVATE_KEY,
                { expiresIn: "5m", issuer: "JO" }
            );

            // 토큰 쿠키에 담기
            res.cookie("token", token, {
                httpOnly: true,
            });
            console.log(token); //토큰이 잘 오는지 확인하려고 나중에는 삭제할 예정
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end(); // 401 : Unauthorized (미인증상태) 403 : Forbidden(접근 권리 없음)
        }
    });
};

const passwordResetRequest = (req, res) => {
    const { email } = req.body;

    let sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        //이메일로 유저가 있는지 찾을것
        const user = results[0];
        if (user) {
            return res.status(StatusCodes.OK).json({ email: email });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
    });
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    //비밀번호를 바꾸려면 새로 값을 받아와야함
    //암호화된 비밀번호와 salt 값을 DB에 저장
    const salt = crypto.randomBytes(10).toString("base64");
    const hashPassword = crypto
        .pbkdf2Sync(password, salt, 10000, 10, "sha512")
        .toString("base64");

    let sql = "UPDATE users SET password = ?, salt =? WHERE email =?";
    let values = [hashPassword, salt, email];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (results.affectedRows == 0) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        } else {
            return res.status(StatusCodes.OK).json(results);
        }
    });
};

module.exports = { join, login, passwordResetRequest, passwordReset };
