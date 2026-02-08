const App = require("./App");
const connectdb = require("./src/config/mdb");

(async () => {
  try {
    await connectdb(); //Only after db connect, server starts listen. If server runs when db fails, hacker send ddos login data to crash server
    App.listen(4000, () => console.log("Server running")); //6th
  } catch (err) {
    console.error(err.message);
  }
})();