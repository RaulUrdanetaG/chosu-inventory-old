const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  imagelink: [String],
  tags: [String],
  location: String,
  price: Number,
  boughtAt: Number,
  description: String,
  owner: String,
});

module.exports = model("item", userSchema);
