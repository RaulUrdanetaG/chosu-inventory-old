const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.json("Should have auth header");
  }

  const token = req.headers["authorization"];
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  } catch (error) {
    return res.json("Wrong token");
  }
  next();
};

module.exports = { checkToken };
