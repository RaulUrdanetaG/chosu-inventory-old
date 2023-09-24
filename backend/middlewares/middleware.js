const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  if (!req.headers["auth"]) {
    return res.json("Should have auth header");
  }
  next();
};

module.exports = { checkToken };
