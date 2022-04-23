// Packages
const express = require("express");

// Controllers
const { singUp } = require("../controllers/Auth");

// Middlewares
const { userSignUpValidator } = require("../middlewares/AuthValidate");

// Instance the router
const router = express.Router();

// Route
router.post("/auth/singUp", userSignUpValidator, singUp);

module.exports = router;
