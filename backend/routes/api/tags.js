const router = require("express").Router();

const Tag = require("../../models/tag.model");
const { checkToken } = require("../../middlewares/middleware");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find();

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

module.exports = router;
