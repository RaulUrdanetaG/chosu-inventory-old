const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");
require("dotenv").config();

exports.getCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const userCart = await User.findById(userId);
    if (!userCart) {
      return res.json({ error: "user doesnt exist" });
    }

    res.json(userCart.cart);
  } catch (error) {
    res.json({ error: error });
  }
});

exports.updateCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.json(user.cart);
  } catch (error) {
    res.json({ error: error.message });
  }
});
