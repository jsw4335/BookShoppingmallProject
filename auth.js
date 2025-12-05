const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const ensureAuthorization = (req, res) => {
    try {
        let receivedJwt = req.headers["authorization"];
        console.log("received jwt : ", receivedJwt);
        if (receivedJwt) {
            // 🔥 핵심 수정 — Bearer 제거
            let token = receivedJwt.startsWith("Bearer ")
                ? receivedJwt.split(" ")[1]  
                : receivedJwt;
            let decodedJwt = jwt.verify(token, process.env.PRIVATE_KEY);

            // let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
            console.log(decodedJwt);
            return decodedJwt;
        } else {
            throw new ReferenceError("jwt must be provided");
        }
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        return err;
    }
};

module.exports = ensureAuthorization;
