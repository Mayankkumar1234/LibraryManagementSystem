const mongoose = require("mongoose");
require("dotenv").config();

let connection = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to mongoDb successfully"))
  .catch((err) => console.error("Error while connecting to Db", err.message));
module.exports = connection;
