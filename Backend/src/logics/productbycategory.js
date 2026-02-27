const Product = require("../Model/Product");

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId }).populate("category", "name");

    res.json(products);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = getProductsByCategory;

