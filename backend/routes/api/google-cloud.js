const router = require("express").Router();

const multer = require("multer");

const cloudController = require("../../controllers/googleCloudController");
const { checkToken } = require("../../middlewares/middleware");

const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

router.post(
  "/upload",
  multerUpload.array("image"),
  checkToken,
  cloudController.uploadImages
);

module.exports = router;
