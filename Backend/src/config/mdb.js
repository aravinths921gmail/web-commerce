const mongoose = require("mongoose");

const connectdb = async()=>{
    try{
       await mongoose.connect("mongodb://localhost:27017/Userdata")
       console.log("Database connected")}
       catch(err){(console.log("Database not connected"))
    } 
}
                                             
module.exports = connectdb;
    