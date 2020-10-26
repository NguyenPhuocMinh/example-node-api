'use strict';

const UserService = require('../../services/web-admin-user');

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
      transform: function (response, result) {
        return (
          response.send(result)
        )
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
        return {
          email: req.body.email,
          password: req.body.password
        }
      }
    },
    output: {
      transform: function (response, result) {
        return (
          response.send(result)
        )
      }
    }
  },
]