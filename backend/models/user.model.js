const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  rile: {
    type: String,
    default: "regular",
  },
});

module.exports = model("user", userSchema);
