const Order = require("../Model/Order");


// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id); // or your ORM
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a refunded order by ID
// Delete a refunded order (just a cancelled order)
const deleteRefund = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE REFUND HIT:", id);

    const order = await Order.findByIdAndDelete(id);

    // 👇 DO NOT THROW 404
    if (!order) {
      return res.status(200).json({
        message: "Order already deleted or not found",
      });
    }

    res.status(200).json({ message: "Refund deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {deleteOrder, deleteRefund}

