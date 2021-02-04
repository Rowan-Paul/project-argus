"use-strict";

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
const port = process.env.PORT || "3000";
const dbName = "orion";

// IMPORT MODELS
require("./models/User");

// IMPORT ROUTES
const accountRouter = require("./routes/api/account");

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

// ROUTES MIDDLEWARE
app.use("/api/account", accountRouter);

app.get("/", (req, res) => {
  res.redirect("https://projectarg.us/");
});

// CREATE SERVER
const server = app.listen(port, () => {
  mongoose.connect(
    `mongodb://localhost:27017/${dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log(`Orion server listening on port ${port}!`);
    }
  );
});
