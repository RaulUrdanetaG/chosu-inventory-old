const { checkToken } = require("../middlewares/middleware");

const router = require("express").Router();

router.use("/users", require("./api/users"));
router.use("/images", require("./api/google-cloud"));
router.use("/items", require("./api/items"));
router.use("/tags", require("./api/tags"));
router.use("/owners", require("./api/owners"));

module.exports = router;
