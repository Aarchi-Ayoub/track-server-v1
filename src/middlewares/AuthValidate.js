exports.userSignUpValidator = (req, res) => {
  // Smart check
  req.check("email", "Email is Required !").notEmpty().isEmail();
  req
    .check("password", "Password is Required !")
    .notEmpty()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must between 6 and 20 Caracters");
  
    // Get the foun errors
  const errors = req.validationErrors();
  
  // Render errors
  if (errors) {
    res.status(400);
    // Send all the messages : errors
    // Send message by message : errors[0].msg
    res.send({ statusCode: 400, success: false, statusMessage: errors[0].msg });
  }
};
