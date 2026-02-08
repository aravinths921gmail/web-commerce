//verify jwt, attach user to req

const express = require("express"); //7th
const authrouter = express.Router(); //8th
const {userpost} = require("../logics/Userlogic")
const {Loginpost} = require("../logics/Loginlogic")
const {verifyToken, Profile} = require("../middlewares/authmiddlewares");


authrouter.post("/userpost", userpost);
authrouter.post("/Loginpost", Loginpost);
authrouter.get("/profile", verifyToken, Profile);



module.exports = authrouter; //9th                                                          
    


