const router = require("express").Router();

const itemsController = require("../../controllers/itemsController");
const { checkToken } = require("../../middlewares/middleware");

router.get("/", itemsController.getItems);

router.post("/", itemsController.getItemsFiltered);

router.get("/:itemId", itemsController.getItemById);

router.put("/:itemId", checkToken, itemsController.updateItemById);

router.delete("/:itemId", checkToken, itemsController.deleteItemById);

router.post("/addItem", checkToken, itemsController.addItem);

module.exports = router;
