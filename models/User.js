var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  time: { type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
