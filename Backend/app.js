const express = require("express"); //1st
const authroute = require("./src/routes/auth.route");

const App = express(); //2nd

App.use(express.json()); //3rd

App.use("/api", authroute) 

App.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = App; //4th
