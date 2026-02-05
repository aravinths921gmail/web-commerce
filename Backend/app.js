const express = require("express"); //1st

const App = express(); //2nd

App.use(express.json()); //3rd

App.use("/api", router) 

App.get("/", (req, res) => {
  res.send("Server is working");
});

module.exports = App; //4th
