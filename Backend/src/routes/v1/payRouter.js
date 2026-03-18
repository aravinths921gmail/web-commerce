const express = require("express");
const payRouter = express.Router();
const { verifyToken, user } = require("../../middlewares/authmiddlewares");
const { paymentLimiter } = require("../../middlewares/rateLimiter");
const addPay = require("../../logics/addPay");
const verifyPayment = require("../../logics/verifyPayment");
const refundPayment = require("../../logics/refundPayment");
const paymentFailure = require("../../logics/paymentFailure");

payRouter.post("/addPay/:orderid", paymentLimiter, verifyToken, user, addPay);
payRouter.post("/verifyPayment/:orderid", paymentLimiter, verifyToken, user, verifyPayment);
payRouter.post("/paymentFailure/:orderid", paymentLimiter, verifyToken, user, paymentFailure);
payRouter.post("/refundPayment/:orderid", paymentLimiter, verifyToken, user, refundPayment);



module.exports = payRouter;

    
