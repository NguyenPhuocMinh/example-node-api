'use strict';

const webServer = require('web-server-node');
const {
  Promise,
  lodash,
  loggingFactory,
  returnCodes
} = webServer;
const User = require('../models/index').UserModel;
const errorCodes = require('../../config/dev/errorCodes');
const { isEmpty, get, isArray } = lodash;
let tokenList = {};

function UserService() {

  // register user
  this.registerUser = async function (args) {
    loggingFactory.info(JSON.stringify(args));
    // Hash Password
    let password = '';
    if (isEmpty(args.password)) {
      password = '123';
    } else {
      password = args.password
    }

    const user = new User({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: password,
    })

    return Promise.resolve(user)
      .then(user => convertUserResponse(user))
      .then(result => {
        return result;
      })
      .then(() => user.save())
      .catch(err => {
        loggingFactory.error('Error Register:', JSON.stringify(err, null, 2));
        return Promise.reject(err);
      });
  };
  // login user
  this.loginUser = async function (args) {
    try {
      const userLogin = await User.findOne({ email: args.email })
      if (!userLogin) {
        return Promise.reject(returnCodes(errorCodes, 'EmailNotFound'))
      }
      tokenList[refreshToken] = userLogin;
      loggingFactory.silly('User Login Info:',
        [
          { 'userId': userLogin.id },
        ]
      )
      return {
        message: 'ok',
      }
    } catch (err) {
      console.log("err", err)
      loggingFactory.error('Error Login:', JSON.stringify(err, null, 1))
      return Promise.reject(err);
    }
  };
};

function convertUserResponse(user) {
  if (!isEmpty(user)) {
    user = user.toJSON();
    user.id = user._id;
    delete user._id;
    return user;
  } else {
    return Promise.resolve();
  }
};

module.exports = new UserService();