// Packages
const mongoose = require("mongoose");

// Instance the user modal
const User = mongoose.model("User");

// SingUp methode
exports.singUp = async (_req, _res) => {
  // Extract information from the request body
  const { email, password } = _req.body;
  const user = new User({ email, password });
  // Save it in DB
  await user.save((err, res) => {
    if (err) {
      _res.status(400);
      _res.send({ statusCode: 400, success: false, statusMessage: err });
    } else {
      const { email, password, _id } = res;
      let data = {
        email,
        password,
        id: _id,
      };
      _res.status(200);
      _res.send({ statusCode: 200, success: true, data });
    }
  });
};
