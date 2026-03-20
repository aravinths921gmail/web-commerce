const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Order of all matters here


const app = express();

const path = require("path"); 

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Handle preflight requests for all routes
// app.options("*", cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// Enable CORS properly (must be before routes)
app.use(cors({
   origin: ["http://localhost:5173", "http://13.58.192.45:5173"], // exact frontend URL
  credentials: true,               // allow sending cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// Routes
const authroute = require("./routes/v1/auth.route");
const orderRouter = require("./routes/v1/orderRouter");
const payRouter = require("./routes/v1/payRouter");
const Catrouter = require("./routes/v1/categoryRoute");
const searchroute = require("./routes/v1/searchroute");

// Middlewares
const { globalLimiter } = require("./middlewares/rateLimiter");
const errorMiddlewares = require("./middlewares/errormiddlewares");

// Enable cookie parser for reading cookies
app.use(cookieParser());




// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter (optional, keep after CORS)
app.use(globalLimiter);

// API routes
app.use("/api/v1/auth", authroute);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", payRouter);
app.use("/api/v1/categories", Catrouter);
app.use("/api/v1/search", searchroute);

// Test root route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Error handling middleware
app.use(errorMiddlewares);

module.exports = app;

