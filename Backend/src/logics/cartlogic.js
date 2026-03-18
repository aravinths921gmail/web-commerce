const Cart = require("../Model/Cart");
const Product = require("../Model/Product");

const addCart = async (req, res) => {
  try {
        console.log("Request body:", req.body);

    const userId = req.details.id;
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity)
      return res.status(400).json({ message: "Not enough stock" });

    let cart = await Cart.findOne({ userId });

    // create new cart
    if (!cart) {

      cart = new Cart({
        userId,
        items: [{ Product: productId, quantity }]
      });

    } else {

      const itemIndex = cart.items.findIndex(
        item => item.Product.toString() === productId
      );

      if (itemIndex > -1) {

        const newQty = cart.items[itemIndex].quantity + quantity;

        if (newQty > product.stock)
          return res.status(400).json({ message: "Stock exceeded" });

        cart.items[itemIndex].quantity = newQty;

      } else {

        cart.items.push({
          Product: productId,
          quantity
        });

      }

    }

    await cart.save();

    res.status(200).json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addCart };