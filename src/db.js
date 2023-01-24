const mongoose = require("mongoose");
const { config } = require("./config");

async function connecToDatabase() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongo.url);
  } catch (err) {
    console.log(err);
    console.log("Database not connected");
  }
}

module.exports = { connecToDatabase };
