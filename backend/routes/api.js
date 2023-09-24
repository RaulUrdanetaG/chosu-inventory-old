const { checkToken } = require("../middlewares/middleware");

const router = require("express").Router();

router.use("/users", require("./api/users"));
router.use("/chosu", require("./api/chosu"));
// router.use("/chosu", checkToken, require("./api/chosu"));

module.exports = router;
