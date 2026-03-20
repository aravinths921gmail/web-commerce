require('dotenv').config({ path: __dirname + '/.env' }); // ensures .env in Backend folder is loaded
// require("dotenv").config();
const App = require("./src/app");
const connectdb = require("./src/config/mdb");
const redis = require("./src/config/redis");

(async () => {
  try {
    await connectdb();

    const port = 4000; // FORCE port
    App.listen(port, "0.0.0.0", (err) => {
      if (err) return console.error("Failed to bind port", err);
      console.log(`Server running on 0.0.0.0:${port}`);
    });
  } catch (err) {
    console.error(err.message);
  }
})();

