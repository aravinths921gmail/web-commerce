const Order = require("../Model/Order");
const redis = require("../config/redis");

const paymentFailure = async (req, res) => {
  try {
    const userId = req.details.id;
    const { orderid } = req.params;

    const redisKey = `payment-failure:${orderid}`;

    // Prevent duplicate failure handling
    const exists = await redis.get(redisKey);
    if (exists) {
      return res.json({ message: "Payment failure already recorded" });
    }

    const order = await Order.findOne({ _id: orderid, userId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.payment.status = "failed";
    order.orderStatus = "placed";
    order.statusHistory.push({ status: "cancelled" });

    await order.save();

    // Cache for 10 minutes to prevent duplicate updates
    await redis.set(redisKey, "done", "EX", 600);

    res.json({ message: "Payment marked as failed", order });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = paymentFailure;