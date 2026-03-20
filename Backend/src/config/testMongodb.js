require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected!");
  return mongoose.connection.db.collection("products").find({}).toArray();
})
.then(products => {
  console.log("Products count:", products.length);
  process.exit(0);
})
.catch(err => {
  console.error("Error connecting to MongoDB:", err.message);
  process.exit(1);
});