'use strict';

const webServer = require('winrow');
const Promise = webServer.require('bluebird');
const lodash = webServer.require('lodash');
const errorCodes = require('../../config/dev/errorCodes');
const { isEmpty, get, isArray } = lodash;
let tokenList = {};

function UserService(params = {}) {
  const { dataStore, returnCodes } = params;
  // register user
  this.registerUser = async function (args, opts) {
    const { loggingFactory, requestId } = opts;
    loggingFactory.info(`function registerUser begin`, { requestId: `${requestId}` });
    // Hash Password
    args.password = '123';

    return dataStore.create({
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
  this.loginUser = async function (args, opts) {
    const { loggingFactory, requestId } = opts;
    try {
      loggingFactory.debug('User login begin', { requestId: `${requestId}` })
      const userLogin = await dataStore.findOne({
        type: 'UserModel',
        filter: { email: args.email }
      })
      if (!userLogin) {
        return Promise.reject(returnCodes(errorCodes, 'EmailNotFound'))
      }
      tokenList[refreshToken] = userLogin;
      loggingFactory.silly('User Login End', { requestId: `${requestId}` })
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

exports = module.exports = new UserService();
exports.init = UserService;