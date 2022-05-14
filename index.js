/*eslint no-undef: "error"*/
/*eslint-env node*/

// Packages
const express = require("express");
const mongoose = require("mongoose");
const expressValidator = require('express-validator');
const bodyParser = require("body-parser");
require("dotenv").config();

// Models
require("./src/models/User");
require("./src/models/Track");


// App routes
const authRoutes = require("./src/routes/Auth");
const tracksRoutes = require("./src/routes/Track");


// App config
const app = express();

// Use the env variables
const port = process.env.PORT || 3000;
const serverHost = process.env.SERVER || "";
const userName = process.env.USERNAME || "";
const password = process.env.PASSWORD || "";
const dbQuery = process.env.DBQUERY || "";

// Convert the request body to Json form
app.use(bodyParser.json()) // || app.use(express.json())

// Use the Express Validator
app.use(expressValidator());

// Use the declared routes
app.use("/api/v1/",authRoutes);
app.use("/api/v1/",tracksRoutes);


// DataBase path
const db = `${serverHost}://${userName}:${password}@cluster0.kneru.mongodb.net/${dbQuery}`;

// Home page
app.get("/api/v1/", (_req, _res) => {
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
