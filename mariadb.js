// mysql 모듈 소환
const mariadb = require("mysql2");

//DB연결 통로 생성

const connection = mariadb.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "BookStore",
    dateStrings: true,
});

module.exports = connection;
