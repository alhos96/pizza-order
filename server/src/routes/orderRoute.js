const express = require("express");
const router = express.Router();

const { order, getOrders } = require("../controller/orderController");

router.post("/finish-order", order);
router.get("/order-history", getOrders);

module.exports = router;
