const router = require("express").Router();

const ownersController = require("../../controllers/ownersController");
const { checkToken } = require("../../middlewares/middleware");

router.get("/", ownersController.getOwners);

router.post("/addOwner", checkToken, ownersController.addOwner);

router.put("/:ownerId", checkToken, ownersController.updateOwnerById);

router.delete("/:ownerId", checkToken, ownersController.deleteOwnerById);

module.exports = router;
