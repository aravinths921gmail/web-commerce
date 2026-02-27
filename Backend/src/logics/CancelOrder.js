const Order = require("../Model/Order");
const Product = require("../Model/Product");

const CancelOrder = async (req, res) => {
    try {
        const userId = req.details.id;
        const { orderid } = req.params;

        const order = await Order.findOne({ _id: orderid, userId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (["shipped", "delivered"].includes(order.orderStatus)) {
            return res.status(400).json({ message: "Cannot cancel shipped order" })
        };

        //  Restore stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock: item.quantity }
            });
        }

        
    // Refund if paid
    if (order.payment.status === "paid") {
      order.payment.status = "refunded";
      order.payment.refundedAt = new Date();
    }

    order.orderStatus = "cancelled";
    order.statusHistory.push({ status: "cancelled" });

    await order.save();

    res.json({ message: "Order cancelled", order });
    }


    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = CancelOrder;