// Packages
const express = require("express");

// Controllers
const { singUp } = require("../controllers/Auth");

// Instance the router
const router = express.Router();

// Route
router.post("/auth/singUp", singUp);

module.exports = router;
