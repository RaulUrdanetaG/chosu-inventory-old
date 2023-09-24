const { checkToken } = require("../middlewares/middleware");

const router = require("express").Router();

router.use("/users", require("./api/users"));
router.use("/chosu", checkToken, require("./api/items"));

module.exports = router;
