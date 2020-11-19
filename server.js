'use strict';

const server = require('winrow');
const repository = require('winrow-repository');
const transform = require('winrow-transform');
const sandbox = require('./config/dev/sandbox');

if (require.main === module) {
  server.start(sandbox);
  repository.connect(sandbox);
  transform.mapping(sandbox);
  require('./src/models');
  const stopped = function () {
    server.stop();
    repository.disconnect(sandbox)
  };
  process.on('SIGINT', stopped);
  process.on('SIGQUIT', stopped);
  process.on('SIGTERM', stopped);
}
