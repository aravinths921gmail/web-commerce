const express = require("express");
const Catrouter = express.Router();

const {createCategory, getCategories, updateCategory, deleteCategory} = require("../../logics/Category");

const {verifyToken, Admin, user} = require("../../middlewares/authmiddlewares")

Catrouter.get("/getCategories", verifyToken, getCategories);

Catrouter.post("/createCategory", verifyToken, Admin, createCategory);
Catrouter.put("/updateCategory/:id", verifyToken, Admin, updateCategory);
Catrouter.delete("/deleteCategory/:id", verifyToken, Admin, deleteCategory);

module.exports = Catrouter;

