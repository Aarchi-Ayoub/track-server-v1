// Packages
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Instance the user modal
const User = mongoose.model("User");

// Register methode
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
        const token = jwt.sign({ userId: _id }, process.env.MYSECRETKEY);
        let data = {
          email,
          password,
          id: _id,
        };
        _res.status(200);
        _res.send({ statusCode: 200, success: true, data, token });
      }
    });
  } catch (error) {
    _res.status(400);
    _res.send({
      statusCode: 400,
      success: false,
      statusMessage: error.message,
    });
  }
};
// Login methode
exports.singIn = async (_req, _res) => {
  // Extract information from the request body
  const { email, password } = _req.body;
  try {
    // Empty fields case
    if (!email || !password) {
      return _res.status(400).send({
        statusCode: 400,
        success: false,
        statusMessage: "Email and password are required !",
      });
    }
    // Search in db
    const user = await User.findOne({ email });

    // User not found
    if (!user) {
      return _res.status(400).send({
        statusCode: 400,
        success: false,
        statusMessage: "Invalid email or password",
      });
    }
    // Check for the password
    try {
      await user.comparePassword(password);
      // eslint-disable-next-line no-undef
      const token = jwt.sign({ userId: user._id }, process.env.MYSECRETKEY);
      let data = {
        email,
        password,
        id: user._id,
      };
      // Return data 
      _res.status(200).send({ statusCode: 200, success: true, data, token });
    } catch (error) {
      return _res.status(400).send({
        statusCode: 400,
        success: false,
        statusMessage: "Invalid email or password",
      });
    }
  } catch (error) {
    _res.status(400);
    _res.send({
      statusCode: 400,
      success: false,
      statusMessage: error.message,
    });
  }
};
