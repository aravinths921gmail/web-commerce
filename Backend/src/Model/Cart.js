const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            unique : true
        },

        items : [cartItemSchema]
}, {timestamps : true}
)

const cartItemSchema = new mongoose.Schema(
    {
        product : {
            type :  mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required : true
        },

        quantity : {
            type : Number,
            required : true,
            min : 1
        }
    }, {_id : false}
);

module.exports = mongoose.model("Cart", cartSchema);

