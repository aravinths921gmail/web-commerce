const Order = require("../Model/Order");
const { v4: uuidv4 } = require("uuid");

const verifyPayment = async (req, res) => {
  try {
    const userId = req.details.id;
    const { orderid } = req.params;

    const order = await Order.findOne({ _id: orderid, userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.payment.transactionId) {
      return res.json({  message: "Payment already verified",  transactionId: order.payment.transactionId,  order });
    }

    const orderAge = Date.now() - new Date(order.createdAt).getTime();
    const isExpired = orderAge > 3600 * 1000; // 1 hour

    if (isExpired) {
      return res.status(400).json({ message: "Order expired" });
    }



    const transactionId = "TXN-" + uuidv4();
    order.payment.status = "paid";
    order.payment.transactionId = transactionId;
    order.payment.paidAt = new Date();

    order.orderStatus = "confirmed";
    order.statusHistory.push({ status: "confirmed" });

    await order.save();

  
    res.json({  message: "Payment verified successfully",  transactionId, order });

  }
  
  catch (err) {  res.status(500).json({ message: err.message });
  }
};

module.exports = verifyPayment;