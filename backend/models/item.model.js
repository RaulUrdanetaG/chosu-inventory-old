const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  imagelink: String,
  tags: [String],
  location: String,
  price: Number,
  boughtAt: Number,
});

module.exports = model("item", userSchema);
