const express = require("express");
const router = express.Router();
const {
    addToCart,
    getCartItems,
    removeCartItem,
} = require("../controller/CartController");
router.use(express.json());

router.route("/").post(addToCart).get(getCartItems); //장바구니에서 선택한 주문 예상 상품 목록조회(get에서 같이함)
router.delete("/:id", removeCartItem);

module.exports = router;
