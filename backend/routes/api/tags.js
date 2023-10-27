const router = require("express").Router();

const tagsController = require("../../controllers/tagsController");
const { checkToken } = require("../../middlewares/middleware");

router.get("/", tagsController.getTags);

router.post("/addTag", checkToken, tagsController.addTag);

router.put("/:tagId", checkToken, tagsController.udpateTagById);

router.delete("/:tagId", checkToken, tagsController.deleteTagById);

module.exports = router;
