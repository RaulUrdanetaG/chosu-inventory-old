const router = require("express").Router();

const cartController = require("../../controllers/cartController");
const { checkToken } = require("../../middlewares/middleware");

router.get("/:userId", cartController.getCart);

router.put("/:userId", cartController.updateCart);

module.exports = router;
