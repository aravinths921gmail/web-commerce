const express = require("express"); //1st
const authroute = require("./routes/auth.route");



const app = express(); //2nd

app.use(express.json()); //3rd

app.use("/api", authroute) 

app.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = app; //4th
