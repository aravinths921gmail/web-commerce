const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Equipment data").then(()=>{console.log("Database connected")})
                                             .catch(()=>{console.log("Database not connected")})

    