const Order = require("../Model/Order");

const getSingleOrder = async (req, res) => {
  try {
    const userId = req.details.id;
    const { orderid } = req.params;

    const order = await Order.findOne({ _id: orderid, userId });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);

  }
  
  catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = getSingleOrder;

