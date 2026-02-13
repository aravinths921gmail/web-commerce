const mongoose = require("mongoose");

const Product = new mongoose.Schema(
    {
    Name : {
        type : String,
        require : true,
    },

    description : 
    {
        type : String,
        require : true,
    },

    price : 
    {
        type : Number,
        required : true,
        min: 0
    },
    
    stock : 
    {
        type : Number,
        required : true,
        min: 0
    },

    // images :
    // {
    //     type : String,
    //     required : true,
    // },

    createdBy :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Fitlease",
        required : true,
    },

})

module.exports = mongoose.model("Product", Product); //"" - is the collection, P - is the model in that collection

