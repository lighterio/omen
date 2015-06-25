var cluster = require('cluster')
var Domain = require('domain')
var Client = require('./lib/client')
require('./common/json/stringify')

/**
 * The Omen function forks processes and creates clients.
 */
var omen = module.exports = function (options) {

  // From the master process of a multi-process ring, fork workers.
  if (cluster.isMaster && (options.processCount > 1)) {
    for (var i = cluster.workers.length; i < options.processCount; i++) {
      cluster.fork()
    }

  // From a worker process, return a ring Client.
  } else {

    var domain = Domain.create()
    var client

    domain.on('error', function (error) {
      throw error
    })
    domain.run(function () {
      client = new Client(options)
    })

    return client
  }
}

// Expose the version number, but only load package JSON if it's requested.
Object.defineProperty(omen, 'version', {
  get: function () {
    return require(__dirname + '/package.json').version
  }
})

// Fill in any string color functions that don't exist.
function returnThis () { return this }

// Enable pretty logging (and don't let Standard complain).
String.prototype.cyan = String.prototype.cyan || returnThis  // eslint-disable-line
String.prototype.green = String.prototype.green || returnThis  // eslint-disable-line
