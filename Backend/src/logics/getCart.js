const Cart = require("../Model/Cart");

const getCart = async (req, res) => {

  try {

    const userId = req.details.id;

    const cart = await Cart.findOne({ userId })
  .populate({
    path: "items.Product",
    populate: {
      path: "category",
      select: "name"
    }
  });
  
    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

module.exports = { getCart };