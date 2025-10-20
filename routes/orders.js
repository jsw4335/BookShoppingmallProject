const express = require("express");
const router = express.Router();

router.use(express.json());

router
    .route("/")
    .post((req, res) => {
        res.json("결제하기");
    })
    .get((req, res) => {
        res.json("주문목록조회");
    });

// 주문 상세 상품 조회
router.get("/:id", (req, res) => {
    res.json("주문 상세 상품 조회");
});

module.exports = router;
