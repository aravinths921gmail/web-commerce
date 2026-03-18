const express = require("express");
const orderRouter = express.Router();
const {verifyToken, Profile, Admin, user} = require("../../middlewares/authmiddlewares");
const checkout = require("../../logics/checkout");
// const checkGet = require("../../logics/checkget");
const addOrder = require("../../logics/addOrder");
const updateOrder = require("../../logics/updateOrder");
const getOrder = require("../../logics/getOrder");
const getSingleOrder = require("../../logics/getSingleOrder");
const getAllOrders = require("../../logics/getOrderadmin");
const CancelOrder = require("../../logics/CancelOrder");
const {globalLimiter} = require("../../middlewares/rateLimiter");
const getRefundedOrders = require("../../logics/getRefundedOrders");
const verifyPayment = require("../../logics/verifyPayment");
const { deleteOrder, deleteRefund } = require("../../logics/orderrefunddelete");

orderRouter.post("/checkout/:cartid", globalLimiter, verifyToken, user, checkout);
// orderRouter.get("/checkGet/:cartid", verifyToken, user, checkGet);

orderRouter.post("/verifyPayment/:orderid", verifyToken, user, verifyPayment);
orderRouter.post("/addOrder/:cartid", verifyToken, user, addOrder);
orderRouter.patch("/updateOrder/:orderid", verifyToken, Admin, updateOrder);    

orderRouter.get("/getOrder", verifyToken, user, getOrder);
orderRouter.get("/getSingleOrder/:orderid", verifyToken, user, getSingleOrder);

orderRouter.get("/getAllOrders", verifyToken, Admin, getAllOrders);
orderRouter.patch("/CancelOrder/:orderid", verifyToken, user, CancelOrder);

orderRouter.get("/getRefundedOrders", verifyToken, user, getRefundedOrders);

orderRouter.delete("/deleteOrder/:id", verifyToken, user, deleteOrder);
orderRouter.delete("/deleteRefund/:id", verifyToken, user, deleteRefund);


module.exports = orderRouter;

