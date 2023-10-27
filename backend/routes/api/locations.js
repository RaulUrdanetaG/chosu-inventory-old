const router = require("express").Router();

const locationsController = require("../../controllers/locationsController");

router.get("/", locationsController.getLocations);

module.exports = router;
