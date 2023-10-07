const router = require("express").Router();

const Location = require("../../models/location.model");
const { checkToken } = require("../../middlewares/middleware");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find().sort({ location: 1 });

    res.json(locations);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
