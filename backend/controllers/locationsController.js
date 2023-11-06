const asyncHandler = require("express-async-handler");

const Location = require("../models/location.model");
const Item = require("../models/item.model");

exports.getLocations = asyncHandler(async (req, res) => {
  try {
    const locations = await Location.find().sort({ location: 1 });

    res.json(locations);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.addLocation = asyncHandler(async (req, res) => {
  // process input tag to maintain a word structure
  const processedTag =
    req.body.location.charAt(0).toUpperCase() +
    req.body.location.slice(1).toLowerCase();

  const existingTag = await Location.findOne({ location: processedTag });

  if (existingTag) {
    res.json({ errorTag: "Tag already exists" });
  } else {
    try {
      const newLocation = await Location.create({ location: processedTag });
      res.json(newLocation);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
});

exports.updateLocationById = asyncHandler(async (req, res) => {
  const { locationId } = req.params;
  try {
    const newLocation = await Location.findByIdAndUpdate(locationId, req.body, {
      new: true,
    });
    // updates every item with the tag to the new tag
    await Item.updateMany(
      { location: req.body.prevLocation },
      { $set: { location: req.body.location } }
    );
    res.json(newLocation);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.deleteLocationById = asyncHandler(async (req, res) => {
  const { locationId } = req.params;

  try {
    const deletedLocation = await Location.findByIdAndDelete(locationId);

    await Item.updateMany(
      { location: deletedLocation.location },
      { $pull: { location: deletedLocation.location } }
    );
    res.json(deletedLocation);
  } catch (error) {
    res.json({ error: error.message });
  }
});
