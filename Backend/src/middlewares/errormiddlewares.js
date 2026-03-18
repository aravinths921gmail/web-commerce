const errorMiddlewares = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Always add CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // or your frontend origin
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

module.exports = errorMiddlewares;