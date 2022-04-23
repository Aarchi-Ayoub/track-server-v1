// Packages
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

// Instance the user modal
const User = mongoose.model("User");

// SingUp methode
exports.singUp = async (_req, _res) => {
  // Extract information from the request body
  const { email, password } = _req.body;
  const user = new User({ email, password });
  try {
    // Save it in DB
    await user.save((err, res) => {
      if (err) {
        _res.status(400);
        _res.send({
          statusCode: 400,
          success: false,
          statusMessage: err.message,
        });
      } else {
        const { email, password, _id } = res;
        // eslint-disable-next-line no-undef
        const token = jwt.sign({userId: _id}, process.env.MYSECRETKEY )
        let data = {
          email,
          password,
          id: _id,
        };
        _res.status(200);
        _res.send({ statusCode: 200, success: true, data , token});
      }
    });
  } catch (error) {
    console.error(error);
    _res.status(401);
    _res.send({
      statusCode: 401,
      success: false,
      statusMessage: error.message,
    });
  }
};
