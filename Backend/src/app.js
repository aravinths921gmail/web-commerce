const express = require("express"); //1st
const authroute = require("./routes/v1/auth.route");
const orderRouter = require("./routes/v1/orderRouter");
const payRouter = require("./routes/v1/payRouter");
const Catrouter = require("./routes/v1/categoryRoute");
const searchroute = require("./routes/v1//searchroute");

const { globalLimiter } = require("./middlewares/rateLimiter");
const errorMiddlewares = require("./middlewares/errormiddlewares");


const app = express(); //2nd

app.use(express.json()); //3rd

app.use(globalLimiter);

app.use("/api/v1/auth", authroute) 

app.use("/api/v1/orders", orderRouter)

app.use("/api/v1/payments", payRouter)

app.use("/api/v1/categories", Catrouter)

app.use("/api/v1/search", searchroute)

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use(errorMiddlewares);

module.exports = app; //4th


