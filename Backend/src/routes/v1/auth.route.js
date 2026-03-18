//verify jwt, attach user to req

const express = require("express"); //7th
const authrouter = express.Router(); //8th
const {userpost} = require("../../logics/Userlogic")
const {Loginpost} = require("../../logics/Loginlogic")
const {verifyToken, Admin, user} = require("../../middlewares/authmiddlewares")
const{getUser} = require("../../logics/getUser")
const {ProductCreate} = require("../../logics/productLogic")
const {productFetch, updateProduct, deleteProduct} = require("../../logics/productFetch")
const getProductsByCategory = require("../../logics/productbycategory")
const {updateUser, deleteUser} = require("../../logics/Userupdatedelete")
const {addCart} = require("../../logics/cartlogic");
const {deleteCart} = require("../../logics/deleteCart");
const {getCart} = require("../../logics/getCart");
// const {addOrder} = require("../Model/addOrder");
const checkout = require("../../logics/checkout");  
const  {authLimiter} = require("../../middlewares/rateLimiter");
const upload = require("../../middlewares/Multer");
// authrouter.patch("/cart", verifyToken, patchCart);
const { removeItem } = require("../../logics/removeItem");



authrouter.post("/userpost", authLimiter, userpost);
authrouter.post("/Loginpost", authLimiter, Loginpost);
// authrouter.get("/profile", verifyToken, Profile);
authrouter.get("/getUser", verifyToken, Admin, getUser);

// authrouter.post("/ProductCreate", verifyToken, Admin, ProductCreate);
authrouter.post("/ProductCreate", verifyToken, Admin, upload.array("images"), ProductCreate);
authrouter.get("/productFetch", productFetch);
authrouter.put("/updateProduct/:id",verifyToken, Admin, updateProduct);
authrouter.delete("/deleteProduct/:id",verifyToken, Admin, deleteProduct);
authrouter.get("/getProductsByCategory/:categoryId", verifyToken, user, getProductsByCategory);
authrouter.put("/updateUser/:id",verifyToken, Admin, updateUser);
authrouter.delete("/deleteUser/:id",verifyToken, Admin, deleteUser);

authrouter.post("/addCart",verifyToken, user, addCart);
authrouter.delete("/deleteCart/:id", verifyToken, user, deleteCart);    
authrouter.get("/getCart", verifyToken, user, getCart);
authrouter.delete("/removeCartItem/:productId", verifyToken, user, removeItem);

// authrouter.post("/addOrder", verifyToken, user, addOrder);
authrouter.post("/checkout/:cartid", verifyToken, user, checkout);

module.exports = authrouter; //9th                                                          



