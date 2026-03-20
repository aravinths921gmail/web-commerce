module.exports = {
  apps: [
    {
      name: "Backend",
      script: "./Server.js",
      cwd: __dirname, // ensures PM2 runs from Backend folder
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        MONGO_URI: "mongodb://127.0.0.1:27017/Fitlease",
        REDIS_URL: "redis://localhost:6379",
        JWT_SECRET: "secretKey",
        JWT_EXPIRE: "7d"
      }
    }
  ]
};