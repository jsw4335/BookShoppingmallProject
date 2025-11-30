// mysql 모듈 소환
const mariadb = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();
//DB연결 통로 생성

const connection = mariadb.createConnection({
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    user: "root",
    password: "root",
    database: "BookStore",
    dateStrings: true,
});

module.exports = connection;
