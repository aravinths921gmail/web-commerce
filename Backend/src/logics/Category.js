const Category = require("../Model/cat");

// Create Category (Admin)
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      message: "Category created", category});
  }
  
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Update
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });}

    res.json({ message: "Category updated", category });
  }
  
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
  

// Delete Category (Admin)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id,{ isActive: false },{ new: true });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted (soft delete)" });
  }
  
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {createCategory, getCategories, updateCategory, deleteCategory};

