const Cart = require("../Model/Cart");

const removeItem = async (req, res) => {
  try {
    const userId = req.details.id; ; 
    const productId = req.params.productId;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { items: { Product: productId } } },
      { new: true }
    ).populate("items.Product");

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({
      message: "Item removed from cart",
      items: updatedCart.items
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { removeItem };