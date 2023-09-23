const router = require("express").Router();

router.use("/users", require("./api/users"));

module.exports = router;
