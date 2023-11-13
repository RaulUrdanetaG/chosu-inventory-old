const router = require("express").Router();

const cartController = require("../../controllers/cartController");

router.get("/:userId", cartController.getCart);

router.put("/:userId", cartController.updateCart);

module.exports = router;
