require("dotenv").config(); 

const App = require("../Backend/src/app");
const connectdb = require("./src/config/mdb");
const redis = require("./src/config/redis");


(async () => {
  try {
    await connectdb(); //Only after db connect, server starts listen. If server runs when db fails, hacker send ddos login data to crash server
    App.listen(process.env.PORT, "0.0.0.0", () => console.log("Server running")); //6th
  } catch (err) {
    console.error(err.message);
  }
})();

