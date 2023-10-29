const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "regular",
  },
  cart: [String],
});

module.exports = model("user", userSchema);
