'use strict';

const webServer = require('winrow');
const { validator } = webServer;
const UserService = require('../../services/web-admin-user');
const { userLoginSchema } = require('../../utils/schema');

module.exports = [
  // user register
  {
    pathName: '/users',
    method: 'POST',
    methodName: 'registerUser',
    serviceName: UserService,
    input: {
      transform: function (req) {
        return {
          ...req.body
        }
      }
    },
    output: {
      transform: function (response) {
        return {
          body: response
        }
      }
    }
  },
  // user login
  {
    pathName: '/user/logins',
    method: 'POST',
    methodName: 'loginUser',
    serviceName: UserService,
    input: {
      transform: function (req) {
        const { valid, errors } = validator(userLoginSchema, req.body);
        if (!valid) {
          return Promise.reject(errors);
        }
        return {
          email: req.body.email,
          password: req.body.password
        }
      }
    },
    output: {
      transform: function (response) {
        return {
          headers: {
            'X-AccessToken': response.token
          },
          body: response
        }
      }
    }
  },
]