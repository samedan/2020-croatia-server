const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    minlength: [4, 'Invalid length. Minimum is 4 characters'],
    maxlength: [32, 'Invalid length. Maximum is 32 characters'],
  },
  email: {
    type: String,
    minlength: [4, 'Invalid length. Minimum is 4 characters'],
    maxlength: [32, 'Invalid length. Maximum is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
  },
  password: {
    type: String,
    minlength: [6, 'Invalid length. Minimum is 4 characters'],
    maxlength: [32, 'Invalid length. Maximum is 32 characters'],
    required: 'Password is required',
  },
});

// whenever save data
userSchema.pre('save', function (next) {
  // 'this' = user data we want to save
  const user = this;

  // console.log(user.password);
  bcrypt.genSalt(10, (err, salt) => {
    // console.log(salt);
    bcrypt.hash(user.password, salt, (err, hashPassword) => {
      // console.log(hashPassword);
      user.password = hashPassword;
      next(); // save to DBB
    });
  });
});

module.exports = mongoose.model('User', userSchema);
