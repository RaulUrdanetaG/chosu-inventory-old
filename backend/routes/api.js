const { checkToken } = require("../middlewares/middleware");

const router = require("express").Router();

router.use("/users", require("./api/users"));
router.use("/images", require("./api/google-cloud"));
router.use("/", require("./api/chosu"));

module.exports = router;
