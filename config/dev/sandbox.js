'use strict';

const mappings = require('../../src/mappings');

module.exports = {
  application: {
    pathServer: '/rest/api',
    enable: false,
    data_ssl: {
      port: 443,
      host: 'exampledomain.com'
    },
    bridge: {
      connect: {
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
      rest_api: {
        mappings: mappings
      }
    },
  },
}