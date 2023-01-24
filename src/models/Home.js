const { Schema, default: mongoose } = require("mongoose");

const widgetSchema = new Schema({
  id: String,
  type: String,
  size: String,
});

const homeSchema = new Schema({
  user_id: String,
  widgets: [widgetSchema],
});

const Home = mongoose.model("Home", homeSchema);
module.exports = Home;
