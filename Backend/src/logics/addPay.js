const Order = require("../Model/Order");
const { v4: uuidv4 } = require("uuid");

const addPay = async (req, res) => {
  try {
    const userId = req.details.id;
    const { orderid } = req.params;
    const { method } = req.body;

    //  Find order
    const order = await Order.findOne({ _id: orderid, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // COD PAYMENT  
    if (method === "COD") {
      order.payment.method = "COD";
      order.payment.status = "pending"; // paid at delivery
      order.orderStatus = "confirmed";

      order.statusHistory.push({ status: "confirmed" });

      await order.save();

      return res.json({message: "COD selected. Pay on delivery.", order});
    }

    // UPI PAYMENT (simulation)
    if (method === "UPI")
      {
      const transactionId = "UPI-" + uuidv4();

      if (!transactionId) {return res.status(400).json({ message: "Transaction ID required" })}

      order.payment.method = "UPI";
      order.payment.status = "paid";
      order.payment.transactionId = transactionId;
      order.payment.paidAt = new Date();

      order.orderStatus = "confirmed";
      order.statusHistory.push({ status: "confirmed" });

      await order.save();

      return res.json({message: "UPI payment successful", order})}

    //  Invalid method
    return res.status(400).json({ message: "Invalid payment method" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = addPay;