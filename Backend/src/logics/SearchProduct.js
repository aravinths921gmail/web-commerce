const Product = require("../Model/Product");

const searchProducts = async (req, res, next) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;

    const query = {};

    // Search by product name
    if (keyword) {
    const normalizedKeyword = keyword.replace(/\s+/g, "").toLowerCase();// split by spaces
  
    query.Name = { $regex: new RegExp(normalizedKeyword.split("").join("\\s*"), "i") };
}

    //  Filter by category
    if (category) {query.category = category};

    //  Filter by price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query).populate("category", "name");

    res.json({
      count: products.length,
      products
    });

  } catch (err) {
    next(err);
  }
};

module.exports = searchProducts;