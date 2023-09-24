const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  itemname: String,
  imagelink: String,
  tags: [String],
  location: String,
});

module.exports = model("item", userSchema);
