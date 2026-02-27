const Order = require("../Model/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = getAllOrders;