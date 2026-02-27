const mongoose = require("mongoose");

const Product = new mongoose.Schema(
    {
    Name : {
        type : String,
        required : true,
    },

    description : 
    {
        type : String,
        required : true,
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
        min: 1
    },

    // images :
    // {
    //     type : String,
    //     required : true,
    // },

     category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",   // ← connects to Category collection
    required: true
    },
    isActive: { type: Boolean, default: true },


    createdBy :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Fitlease",
        required : true,
    },

})

module.exports = mongoose.model("Product", Product); //"" - is the collection, P - is the model in that collection

