const mongoose = require("mongoose");

const connectdb = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Database connected")}
       catch(err){(console.error("Database not connected:", err))
    } 
}
                                             
module.exports = connectdb;
    