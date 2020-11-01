'use strict';

const webServer = require('winrow');
const {
  Promise,
  lodash,
  loggingFactory,
  returnCodes,
  dataMongoose
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
    args.password = '123';

    return dataMongoose.create({
      type: 'UserModel',
      data: args
    })
      .then(user => convertUserResponse(user))
      .catch(err => {
        loggingFactory.error('Error Register:', JSON.stringify(err, null, 2));
        return Promise.reject(err);
      });
  };
  // login user
  this.loginUser = async function (args) {
    try {
      const userLogin = await dataMongoose.findOne({
        type: 'UserModel',
        filter: { email: args.email }
      })
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
        token: 'token',
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