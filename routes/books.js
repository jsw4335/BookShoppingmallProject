const express = require("express");
const router = express.Router();
const { allBooks, bookDetail } = require("../controller/BookController");

router.use(express.json());

router.get("/", allBooks); //카테고리 id 있다면 카테고리별 도서 조회, 전체 도서 조회

//개별 도서 조회
router.get("/:id", bookDetail);

module.exports = router;
