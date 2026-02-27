const Cart = require("../Model/Cart");
const Product = require("../Model/Product");

const addCart = async (req, res) => {
    try {
        const userId = req.details.id;  // verified user
        const { Product: productId, quantity } = req.body; // rename to avoid conflict with Product model

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        let duplicateCart = await Cart.findOne({ userId });

        //  If cart doesn't exist, create a new one
        if (!duplicateCart) {
            const cart = new Cart({userId, items: [{ Product: productId, quantity: 1 }]
            });

            const savedCart = await cart.save();
            return res.status(201).json(savedCart);
        }

        //  Cart exists → check if the product is already in the cart
        const item = duplicateCart.items.find((item) => item.Product.toString() === productId);

        if (item) {
            const product = await Product.findById(item.Product); //In product schema model, if any product id is matched to cart item's product, choose that product

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (item.quantity >= product.stock) {
                return res.status(400).json({ message: "Quantity exceeds available stock" });
            }

            // Increment quantity
            item.quantity += 1;

        } else {
            //  Add new product to cart
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (product.stock < 1) {
                return res.status(400).json({ message: "Product is out of stock" });
            }

            duplicateCart.items.push({ Product: productId, quantity: quantity ? quantity : 1 });
        }

        await duplicateCart.save();
        return res.status(200).json(duplicateCart);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { addCart };
