const mongoose = require("mongoose");
require("dotenv").config();

// Config options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connecting to db
mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log("Succesful MongoDB connection");
  })
  .catch((error) => {
    console.error("MongoDB connection error: ", error);
  });
