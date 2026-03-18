const rateLimit = require("express-rate-limit");

// Global limiter (applies to all requests)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: "Too many requests. Please try again later."
});

// Login limiter
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Try again later."
});


// Payment limiter
const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: "Too many payment attempts."
});

module.exports = {globalLimiter, authLimiter, paymentLimiter};