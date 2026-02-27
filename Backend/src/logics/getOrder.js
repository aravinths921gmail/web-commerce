const Order = require("../Model/Order");

const getOrder = async(req, res) => {
    try{
        const userId = req.details.id;

        const order = await Order.find({userId}).sort({createdAt : -1});

        res.status(200).json(order);
    }

    catch(err)
    {
        res.status(500).json({message : err.message})
    }
}

module.exports = getOrder;