const Product = require('../Model/Product');

const ProductCreate = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { Name, description, price, stock, category } = req.body;

    if (!Name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "All product fields are required" });
    }

    const createdBy = req.user?.id || req.details?.id;

    const images = req.files.map(file => file.filename);

    const product = new Product({
      Name,
      description,
      price,
      stock,
      category,
      createdBy,
      images,
    });

    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Product creation error:", err.message);
    return res.status(500).json({ message: "Server error: " + err.message });
  }
};

module.exports = {ProductCreate}

