const asyncHandler = require("express-async-handler");

const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

const gc = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
  projectId: "chosu-inventory",
});

exports.uploadImages = asyncHandler(async (req, res) => {
  try {
    let uploadedUrls = [];

    // makes all item requestes and store promises in a var
    const promises = req.files.map((file) => uploadFile(file));
    // resolve all promises in the same order
    uploadedUrls = await Promise.all(promises);

    res.json({ urls: uploadedUrls });
  } catch (error) {
    res.json({ error: error.message });
  }
});

function uploadFile(file) {
  const bucketName = "chosu-images";
  const chosuImagesBucket = gc.bucket(bucketName);
  return new Promise(async (resolve, reject) => {
    try {
      // Check if it already exists in Google cloud
      const existingFile = chosuImagesBucket.file(file.originalname);
      const [exists] = await existingFile.exists();

      if (!exists) {
        // File does not exist, start uploading
        const fileName = file.originalname;
        const fileUpload = chosuImagesBucket.file(fileName);
        const stream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        stream.end(file.buffer);

        // wait for process to end
        await new Promise((resolve, reject) => {
          stream.on("finish", resolve);
          stream.on("error", reject);
        });

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        resolve(publicUrl);
      } else {
        // file already exists, add its url to the array
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.originalname}`;
        resolve(publicUrl);
      }
    } catch (error) {
      reject(error);
    }
  });
}
