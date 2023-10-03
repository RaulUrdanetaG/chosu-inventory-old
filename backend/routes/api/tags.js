const router = require("express").Router();

const Tag = require("../../models/tag.model");
const Item = require("../../models/item.model");
const { checkToken } = require("../../middlewares/middleware");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find().sort({ tagname: 1 });

    res.json(tags);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/addTag", checkToken, async (req, res) => {
  const existingTag = await Tag.findOne({ tagname: req.body.tagname });

  if (existingTag) {
    res.json({ errorTag: "Tag already exists" });
  } else {
    try {
      const newTag = await Tag.create(req.body);
      res.json(newTag);
    } catch (error) {
      res.json({ error: error });
    }
  }
});

router.put("/update/:tagId", checkToken, async (req, res) => {
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

module.exports = router;