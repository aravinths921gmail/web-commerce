//verify jwt, attach user to req

const express = require("express"); //7th
const authrouter = express.Router(); //8th
const {userpost} = require("../logics/Userlogic")
const {Loginpost} = require("../logics/Loginlogic")
const {verifyToken, Profile, Admin} = require("../middlewares/authmiddlewares")
const {ProductCreate} = require("../logics/productLogic")
const {productFetch, updateProduct, deleteProduct} = require("../logics/productFetch")
const {updateUser, deleteUser} = require("../logics/Userupdatedelete")
const {addCart} = require("../logics/cartlogic");


authrouter.post("/userpost", userpost);
authrouter.post("/Loginpost", Loginpost);
authrouter.get("/profile", verifyToken, Profile);

authrouter.post("/productCreate", verifyToken, Admin, ProductCreate);
authrouter.get("/productFetch",verifyToken, productFetch);
authrouter.put("/updateProduct/:id",verifyToken, Admin, updateProduct);
authrouter.delete("/deleteProduct/:id",verifyToken, Admin, deleteProduct);
authrouter.put("/updateUser/:id",verifyToken, Admin, updateUser);
authrouter.delete("/deleteUser/:id",verifyToken, Admin, deleteUser);

authrouter.post("/addCart", addCart);

module.exports = authrouter; //9th                                                          



