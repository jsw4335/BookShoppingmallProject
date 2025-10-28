const express = require("express");
const router = express.Router();
const {
    order,
    getOrders,
    getOrderDetail,
} = require("../controller/OrderController");
router.use(express.json());

router.route("/").post(order).get(getOrders);

// 주문 상세 상품 조회
router.get("/:id", getOrderDetail);

module.exports = router;
