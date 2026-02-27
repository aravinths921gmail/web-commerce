const express = require("express");
const searchRoute = express.Router();

const searchProducts = require("../../logics/SearchProduct");
const {verifyToken, Profile, Admin, user} = require("../../middlewares/authmiddlewares")


searchRoute.get("/searchProducts/products", verifyToken, user, searchProducts);

module.exports = searchRoute;