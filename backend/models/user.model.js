const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  phone: Number,
  role: {
    type: String,
    default: "regular",
  },
  cart: [String],
});

module.exports = model("user", userSchema);
