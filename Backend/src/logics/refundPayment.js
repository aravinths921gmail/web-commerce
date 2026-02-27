const Order = require("../Model/Order");
const redis = require("../config/redis");

const refundPayment = async(req, res) => {
    try{

        const {orderid} = req.params;
        const userId = req.details.id;

         const lockKey = `refundlock:${orderid}`;

        const lock = await redis.set(lockKey, "locked", "NX", "EX", 30);
        if (!lock) {
          return res.status(409).json({ message: "Refund already in progress" });
        }

        const order = await Order.findOne({_id : orderid, userId});

         if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.payment.status !== "paid") {
            return res.status(400).json({ message: "Only paid orders can be refunded" });
        }

        order.payment.status = "refunded";
        order.orderStatus = "returned";
        order.statusHistory.push({ status: "returned" });

        await order.save();

        await redis.del(lockKey);

        res.json({ message: "Payment marked as failed", order });

        res.json({ message: "Refund successful", order });

    }

    catch(err){
        res.status(500).json({message : err.message});
    }
}

module.exports = refundPayment;

