const { model, Schema } = require("mongoose");

const tagSchema = new Schema({
  tagname: String,
});

module.exports = model("tag", tagSchema);