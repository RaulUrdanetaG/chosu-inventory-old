const { model, Schema } = require("mongoose");

const locationSchema = new Schema({
  location: String,
});

module.exports = model("location", locationSchema);
