const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");
require("dotenv").config();

// POST /users/register
router.post("/register", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 12);

    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.json({ error: error });
  }
});

// POST /users/login
router.post("/login", async (req, res) => {
  // Check if user exists
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.json({ error: "Wrong username/password" });
  }

  const eq = bcrypt.compareSync(req.body.password, user.password);

  if (!eq) {
    return res.json({ error: "Wrong username/password" });
  }

  res.json({
    succes: "Succesfull Login",
    token: createToken(user),
  });
});

function createToken(user) {
  const payload = {
    user_id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
}

module.exports = router;
