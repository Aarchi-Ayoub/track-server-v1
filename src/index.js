// Packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// App config
const app = express();

// Use the env variables
const port = process.env.PORT || 3000;
const serverHost = process.env.SERVER || "";
const userName = process.env.USERNAME || "";
const password = process.env.PASSWORD || "";
const dbQuery = process.env.DBQUERY || "";

// DataBase path
const db = `${serverHost}://${userName}:${password}@cluster0.kneru.mongodb.net/${dbQuery}`;
// Home page
app.get("/", (_req, _res) => {
  _res.send("Hello there");
});

// Start connection with the db
mongoose
  .connect(db)
  .then(() => console.log("Connect to database..."))
  .catch((err) => console.log("Can not connect to database == ", err));

// Server port
app.listen(port, () => {
  console.log(`Server set on port ${port}...`);
});
