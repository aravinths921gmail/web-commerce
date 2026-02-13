const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            lowercase: true,
        },

        password : {
            type : String,
            required : true,
        },

        role : {
            type : String,
            default: "user",
        }
    })

module.exports = mongoose.model("Userdata", User); //Userdata is the db collection name in mdb. User is a model name used for saving data in schema.
