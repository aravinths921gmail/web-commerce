const Order = require("../Model/Order");

//Instead of manual clicks, shiprockets or courier api's and webhooks handle's this:

// You place order → status = placed

// Warehouse system auto updates → packed

// Courier scans parcel → shipped

// Delivery agent marks delivered → delivered


const updateOrder = async(req, res) =>{
    try{
        const {orderid} = req.params;
        const {orderStatus} = req.body;

        const allowedStatus = ["placed", "confirmed", "packed", "shipped", "out_for_delivery", "delivered", "cancelled", "returned"];

    if (!allowedStatus.includes(orderStatus)) {
    return res.status(400).json({ message: "Invalid status" });
}

    const order = await Order.findById(orderid);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = orderStatus;
    order.statusHistory.push({ status : orderStatus });

    await order.save();

    res.json({ message: "Order status updated", order });}

   

    catch(err){res.status(500).json(err.message);}
}

module.exports = updateOrder;

