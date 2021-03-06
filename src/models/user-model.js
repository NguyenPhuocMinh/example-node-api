'use strict';

const server = require('exp-server');
const mongoose = server.require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  //filter
  slug: { type: String },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: Date },
  updatedBy: { type: String },
});

const User = mongoose.model('UserModel', UserSchema, 'users');
module.exports = User;