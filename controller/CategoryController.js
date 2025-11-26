const conn = require("../mariadb"); //db모듈
const { StatusCodes } = require("http-status-codes"); //status code모듈

const allCategory = (req, res) => {
    //카테고리 전체 목록 리스트
    let sql = "SELECT * FROM category";
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        // 프론트에 맞게 key 변경
        const categories = results.map((item) => ({
            id: item.category_id,
            name: item.category_name,
        }));
        return res.status(StatusCodes.OK).json(categories);
    });
};

module.exports = { allCategory };
