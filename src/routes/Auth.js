// Packages
const express = require("express");

// Controllers
const { singUp , singIn } = require("../controllers/Auth");

// Middlewares
const { userSignUpValidator } = require("../middlewares/AuthValidate");
const { checkAuth } = require("../middlewares/CheckAuth");

// Instance the router
const router = express.Router();

// Route
router.post("/auth/singUp", userSignUpValidator, singUp);
router.post("/auth/singIn", userSignUpValidator, singIn);


router.get("/auth", checkAuth, (req, res) => {
  res.send(`Your email adress is : ${req.user.email}`);
});

module.exports = router;
