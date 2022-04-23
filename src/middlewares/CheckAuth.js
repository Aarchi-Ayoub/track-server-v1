// Packages
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Instance the user modal
const User = mongoose.model("User");

exports.checkAuth = (req, res, next) => {
  // Extract the token attr from the headers
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      statusCode: 401,
      success: false,
      statusMessage: "Session Expired ! Access deneid...",
    });
  }
  // Get the token value
  const token = authorization.replace("Bearer ", "");
  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.MYSECRETKEY, async (err, payload) => {
    // Case of error
    if (err) {
      return res.status(401).send({
        statusCode: 401,
        success: false,
        statusMessage: "Session Expired ! Access deneid...",
      });
    }
    // 
    const { userId } = payload;
    
    // Get the user from DB
    const user = await User.findById(userId);
    
    // Return this user
    req.user = user;
    
    // Go to the next middlewares or function
    next();
  });
};
