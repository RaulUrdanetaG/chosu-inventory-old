const router = require("express").Router();

const Item = require("../../models/item.model");
const { checkToken } = require("../../middlewares/middleware");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    var items = {};
    if (req.query.tag) {
      items = await Item.find({ tags: { $in: req.query.tag } }).sort({
        name: 1,
      });
    } else if (req.query.owner) {
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

router.get("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const items = await Item.findById(itemId);

    res.json(items);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/:itemId", checkToken, async (req, res) => {
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

router.delete("/:itemId", checkToken, async (req, res) => {
  const { itemId } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    res.json(deletedItem);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/addItem", checkToken, async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
