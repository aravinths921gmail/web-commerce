const Cart = require("../Model/Cart");

const checkout = async (cartId, userId) => {
  const cart = await Cart.findOne({ _id: cartId, userId }).populate("items.Product");

  if (!cart) throw new Error("Cart not found");
  if (cart.items.length === 0) throw new Error("Cart is empty");

  const items = cart.items.map(item => ({
    productId: item.Product._id,
    name: item.Product.name,
    price: item.Product.price,
    image: item.Product.image,
    quantity: item.quantity,
    subtotal: item.quantity * item.Product.price
  }));

  const itemsTotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = itemsTotal > 1000 ? 0 : 100;
  const grandTotal = itemsTotal + shipping;

  return { items, itemsTotal, shipping, grandTotal };
};

module.exports = checkout;