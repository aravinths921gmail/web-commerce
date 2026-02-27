const Order = require("../Model/Order");
const { v4: uuidv4 } = require("uuid");

const verifyPayment = async (req, res) => {
  try {
    const userId = req.details.id;
    const { orderid } = req.params;

    const order = await Order.findOne({ _id: orderid, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.payment.status === "paid") {
      return res.json({ message: "Payment already verified", order });
    }

    // Simulate payment verification
    const transactionId = "TXN-" + uuidv4();

    // Update order payment
    order.payment.status = "paid";
    order.payment.transactionId = transactionId;
    order.payment.paidAt = new Date();
    order.orderStatus = "confirmed";
    order.statusHistory.push({ status: "confirmed" });

    await order.save();

    // Save payment record
    await Order.payment.create({
      orderId: order._id,
      userId,
      method: order.payment.method,
      status: "success",
      transactionId,
      amount: order.pricing.grandTotal,
      paidAt: new Date()
    });

    res.json({message: "Payment verified successfully",transactionId,order});

  }
  
  catch (err) {res.status(500).json({ message: err.message })}
};

module.exports = verifyPayment;

