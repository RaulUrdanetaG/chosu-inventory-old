const asyncHandler = require("express-async-handler");

const Tag = require("../models/tag.model");
const Item = require("../models/item.model");

exports.getTags = asyncHandler(async (req, res) => {
  try {
    const tags = await Tag.find().sort({ tagname: 1 });

    res.json(tags);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.addTag = asyncHandler(async (req, res) => {
  // process input tag to maintain a word structure
  const processedTag =
    req.body.tagname.charAt(0).toUpperCase() +
    req.body.tagname.slice(1).toLowerCase();

  const existingTag = await Tag.findOne({ tagname: processedTag });

  if (existingTag) {
    res.json({ errorTag: "Tag already exists" });
  } else {
    try {
      const newTag = await Tag.create({ tagname: processedTag });
      res.json(newTag);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
});

exports.updateTagById = asyncHandler(async (req, res) => {
  const { tagId } = req.params;
  try {
    const newTag = await Tag.findByIdAndUpdate(tagId, req.body, { new: true });
    // updates every item with the tag to the new tag
    await Item.updateMany(
      { tags: req.body.prevTag },
      { $set: { "tags.$": req.body.tagname } }
    );
    res.json(newTag);
  } catch (error) {
    res.json({ error: error.message });
  }
});

exports.deleteTagById = asyncHandler(async (req, res) => {
  const { tagId } = req.params;

  try {
    const deletedTag = await Tag.findByIdAndDelete(tagId);

    await Item.updateMany(
      { tags: deletedTag.tagname },
      { $pull: { tags: deletedTag.tagname } }
    );
    res.json(deletedTag);
  } catch (error) {
    res.json({ error: error.message });
  }
});
