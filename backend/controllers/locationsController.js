const asyncHandler = require("express-async-handler");

const Location = require("../models/location.model");

exports.getLocations = asyncHandler(async (req, res) => {
  try {
    const locations = await Location.find().sort({ location: 1 });

    res.json(locations);
  } catch (error) {
    res.json({ error: error.message });
  }
});
