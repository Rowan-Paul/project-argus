"use-strict";

require("dotenv").config();
require("./scheduler");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
const port = process.env.PORT || "3000";
const dbName = "orion";

const UserSession = require("./models/UserSession");
const encryptor = require("simple-encryptor")(
  process.env.KEY || "secretpasswordofmysupersecretkey"
);

// IMPORT MODELS
require("./models/User");

// IMPORT ROUTES
const accountRouter = require("./routes/api/account");

// MIDDLEWARE
app.use(bodyParser.json());

var whitelist = [
  "http://localhost:3001",
  "https://projectarg.us",
  "https://status.projectarg.us",
];
app.use(
  "/api",
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Authorize middleware
app.use("/api/v1/movies", function (req, res, next) {
  if (req.headers.authorization === undefined) {
    res.sendStatus(401);
  } else {
    const authHeader = req.headers.authorization;

    var tokenDec = encryptor.decrypt(authHeader.split(" ")[1]);

    if (
      tokenDec === null ||
      !("random" in tokenDec) ||
      !("id" in tokenDec) ||
      !("timestamp" in tokenDec)
    ) {
      res.sendStatus(401);
    }

    // Verify the token is one of a kind and it's not deleted.
    UserSession.find(
      {
        _id: tokenDec.id,
        random: tokenDec.random,
        timestamp: tokenDec.timestamp,
        isDeleted: false,
      },
      (err, sessions) => {
        if (err) {
          res.sendStatus(401);
        }

        if (sessions.length != 1) {
          res.sendStatus(401);
        } else {
          next();
        }
      }
    );
  }
});

// ROUTES MIDDLEWARE
app.use("/api/v1/account", accountRouter);

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
