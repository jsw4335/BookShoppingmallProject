const conn = require("../mariadb"); //db모듈
const { StatusCodes } = require("http-status-codes"); //status code모듈

const addLike = (req, res) => {
    // 좋아요 추가
    const { user_id } = req.body;
    const { id } = req.params; //liked_book_id

    let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
    let values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
};

const removeLike = (req, res) => {
    // 좋아요 삭제
    const { user_id } = req.body;
    const { id } = req.params; //liked_book_id

    let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id =?";
    let values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = { addLike, removeLike };
