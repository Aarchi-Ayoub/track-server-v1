// Packages
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
});

/**
 * Additional call before instance a user in our db
 */
userSchema.pre("save", function (next) {
  // Get ref of the user
  const user = this;
  // The user hasn't modified his pwd
  if (!user.isModified("password")) {
    // Give up
    return next();
  }
  // Generate the salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // Hash the salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // Update the user pwd
      user.password = hash;
      // Complete the login
      next();
    });
  });
});

mongoose.model("User", userSchema);
