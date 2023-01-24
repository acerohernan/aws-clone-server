const { Schema, default: mongoose } = require("mongoose");

const widgetSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  footer: {
    type: String,
    nullable: true,
  },
  infoLink: {
    type: Boolean,
    default: false,
  },
  big: {
    type: Boolean,
    default: false,
  },
  isAdded: {
    type: Boolean,
    default: false,
  },
});

const Widget = mongoose.model("Widget", widgetSchema);
module.exports = Widget;
