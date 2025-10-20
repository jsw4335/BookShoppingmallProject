const express = require("express");
const router = express.Router();

router.use(express.json());

router
    .route("/")
    .post((req, res) => {
        res.json("장바구니 담기");
    })
    .get((req, res) => {
        res.json("장바구니 조회");
    });
router.delete("/:id", (req, res) => {
    res.json("장바구니 도서삭제");
});
//장바구니에서 선택한 주문 예상 상품 목록조회는 어떻게 할거?
//url 어떻게 할지 고민중
// router.get("/:", (req, res) => {
//     res.json("주문 예상 상품 조회");
// });
module.exports = router;
