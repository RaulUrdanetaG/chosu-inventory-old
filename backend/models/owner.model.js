const { model, Schema } = require("mongoose");

const ownerSchema = new Schema({
  owner: String,
});

module.exports = model("owner", ownerSchema);