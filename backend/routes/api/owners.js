const router = require("express").Router();

const Owner = require("../../models/owner.model");
const Item = require("../../models/item.model");
const { checkToken } = require("../../middlewares/middleware");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const owners = await Owner.find().sort({ owner: 1 });

    res.json(owners);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/addOwner", checkToken, async (req, res) => {
  // process input tag to maintain a word structure
  const processedOwner =
    req.body.owner.charAt(0).toUpperCase() +
    req.body.owner.slice(1).toLowerCase();

  const existingOwner = await Owner.findOne({ owner: processedOwner });

  if (existingOwner) {
    res.json({ errorOwner: "Owner already exists" });
  } else {
    try {
      const newOwner = await Owner.create({ owner: processedOwner });
      res.json(newOwner);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
});

router.put("/:ownerId", checkToken, async (req, res) => {
  const { ownerId } = req.params;
  try {
    const newOwner = await Owner.findByIdAndUpdate(ownerId, req.body, {
      new: true,
    });
    // updates every item with the tag to the new tag
    await Item.updateMany(
      { owner: req.body.prevOwner },
      { $set: { owner: req.body.owner } }
    );
    res.json(newOwner);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:ownerId", checkToken, async (req, res) => {
  const { ownerId } = req.params;

  try {
    const deletedOwner = await Owner.findByIdAndDelete(ownerId);

    res.json(deletedOwner);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
