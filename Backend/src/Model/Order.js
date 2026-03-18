const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  name: String,
  price: Number,
  image: String,
  quantity: Number,
  subtotal: Number
}, { id: false }
)

// ADDRESS
const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "India" }
  },
  { _id: false }
);

// PAYMENT 
const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["COD", "UPI"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },
    transactionId: String,
    paidAt: Date
  },
  { _id: false }
);


// ORDER 
const orderSchema = new mongoose.Schema(
  {

    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userdata",
      required: true,
      index: true
    },

    items: [orderItemSchema],

    pricing: {
      // tax: { type: Number, default: 0 },
      shipping: { type: Number, default: 0 },
      itemsTotal: Number,
      grandTotal: Number,
    },

    shippingAddress: addressSchema,

    payment: paymentSchema,

    orderStatus: {
      type: String,
      enum: ["placed", "confirmed", "packed", "shipped", "out_for_delivery", "delivered", "cancelled", "returned"],
      default: "placed",
      index: true
    },

    statusHistory: [
      {
        status: String,
        at: { type: Date, default: Date.now }
      }
    ],

    delivery: {
      provider: String,
      trackingId: String,
      estimatedDelivery: Date,
      deliveredAt: Date
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

