const asyncHandler = require("express-async-handler");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
require("dotenv").config();

exports.userRegister = asyncHandler(async (req, res) => {
  try {
    const userCheck = await User.findOne({ username: req.body.username });
    if (userCheck) {
      return res.json({ error: "user already exists" });
    }

    // encrypt password usyng bcrypt
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.json({ error: error });
  }
});

exports.userLogin = asyncHandler(async (req, res) => {
  // Check if user exists
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.json({ error: "Wrong username/password" });
  }

  const eq = bcrypt.compareSync(req.body.password, user.password);

  if (!eq) {
    return res.json({ error: "Wrong username/password" });
  }

  if (user.role === process.env.ADMIN_TOKEN) {
    res.json({
      succes: "Succesfull Login",
      token: createToken(user),
      user: false,
      id: user._id,
    });
  } else {
    res.json({
      succes: "Succesfull Login",
      user: true,
      id: user._id,
    });
  }
});

function createToken(user) {
  const payload = {
    user_id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
}
