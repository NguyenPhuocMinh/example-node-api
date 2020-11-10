'use strict';

const server = require('web-server-node');
const repository = require('winrow-repository');
const transform = require('winrow-transform');
const sandbox = require('./config/dev/sandbox');

if (require.main === module) {
  server.start();
  repository.connect(sandbox);
  transform.mapping(sandbox);
  const stopped = function () {
    server.stop();
  };
  process.on('SIGINT', stopped);
  process.on('SIGQUIT', stopped);
  process.on('SIGTERM', stopped);
}
