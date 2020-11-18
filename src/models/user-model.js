'use strict';

const mongoose = require('winrow').mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
});

const User = mongoose.model('UserModel', UserSchema, 'users');
module.exports = User;