const router = require("express").Router();

const locationsController = require("../../controllers/locationsController");
const { checkToken } = require("../../middlewares/middleware");

router.get("/", locationsController.getLocations);

router.post("/addLocation", checkToken, locationsController.addLocation);

router.put("/:locationId", checkToken, locationsController.updateLocationById);

router.delete("/:locationId", checkToken, locationsController.deleteLocationById);

module.exports = router;
