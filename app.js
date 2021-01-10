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

// CORS
var whitelist = ["https://projectarg.us", "http://localhost:3001"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors(corsOptions));

// ROUTES MIDDLEWARE
app.use("/api/account", accountRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
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
