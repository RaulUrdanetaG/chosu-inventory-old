const asyncHandler = require("express-async-handler");

const Item = require("../models/item.model");

exports.getItems = asyncHandler(async (req, res) => {
  try {
    var items = {};
    if (req.query.owner) {
      items = await Item.find({ owner: { $in: req.query.owner } }).sort({
        name: 1,
      });
    } else if (req.query.location) {
      items = await Item.find({ location: { $in: req.query.location } }).sort({
        name: 1,
      });
    } else if (req.query.name) {
      items = await Item.find({
        name: { $regex: req.query.name, $options: "i" },
      }).sort({
        name: 1,
      });
    } else {
      items = await Item.find().sort({
        name: 1,
      });
    }

    res.json(items);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.getItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  try {
    const items = await Item.findById(itemId);

    res.json(items);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.updateItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.deleteItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    res.json(deletedItem);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.getItemsFiltered = asyncHandler(async (req, res) => {
  let query = {};

  if (req.body.length > 0) {
    query = { tags: { $all: req.body } };
  }
  try {
    const items = await Item.find(query).sort({ name: 1 });
    res.json(items);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.addItem = asyncHandler(async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (error) {
    res.json({ error: error });
  }
});
