const Order = require("../Model/Order");

const getRefundedOrders = async (req, res) => {
  try {

    const userId = req.details.id;

    const orders = await Order.find({ userId, "payment.status": "refunded" }).sort({ createdAt: -1 });

    res.json(orders);

  }
  
  catch (err) { res.status(500).json({ message: err.message }) }
};

module.exports = getRefundedOrders;

