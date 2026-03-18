const mongoose = require("mongoose");



const cartItemSchema = new mongoose.Schema(
    {
        Product : {
            type :  mongoose.Schema.Types.ObjectId,
            ref: "Product", //This obj id refers to the product id
            required : true
        },

        quantity : {
            type : Number,
            required : true,
            min : 1 //Prevent -1 quantity   
        }
    }, 
    // {_id : false} //prevent automatic id for this schema
);
    
const Cart = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            unique : true //prevents duplicate userid(user) in cart and give all products in single userid
        },

        items : [cartItemSchema]
}, {timestamps : true}
)

module.exports = mongoose.model("Carts", Cart);

