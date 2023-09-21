const express = require("express");
const cors = require("cors");

require("./config/db");
require("dotenv").config();

const app = express();

// config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GETs and POSTs
app.use("/in", require("./routes/api"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running in port ${process.env.PORT}`);
});
