'use strict';

const mappings = require('../../src/mappings');

module.exports = {
  application: {
    pathServer: '/rest/api',
    enable: false,
    bridge: {
      database_local: {
        host: 'localhost',
        port: '27017',
        name: 'demoLocal',
      },
      database_server: {
        host: 'localhost',
        port: '27017',
        name: 'demoServer',
      }
    },
    mappings: mappings
  },
}