const asyncHandler = require("express-async-handler");

const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

const gc = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
  projectId: "chosu-inventory",
});

exports.uploadImage = asyncHandler(async (req, res) => {
  const bucketName = "chosu-images";
  try {
    const file = req.file;

    if (!file) {
      return res.send("No image found.");
    }

    // Generates a unique name
    const fileName = `${Date.now()}-${file.originalname}`;

    const chosuImagesBucket = gc.bucket(bucketName);
    const fileUpload = chosuImagesBucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.end(file.buffer);

    // Wait for upload to be done
    await new Promise((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    res.json({ url: publicUrl });
  } catch (error) {
    res.json({ error: error });
  }
});
