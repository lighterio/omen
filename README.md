# <a href="http://lighter.io/omen" style="font-size:40px;text-decoration:none"><img src="https://cdn.rawgit.com/lighterio/lighter.io/master/public/omen.svg" style="width:90px;height:90px"> Omen</a>
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/omen.svg)](//www.npmjs.com/package/omen)
[![Downloads](https://img.shields.io/npm/dm/omen.svg)](//www.npmjs.com/package/omen)
[![Build](https://img.shields.io/travis/lighterio/omen.svg)](//travis-ci.org/lighterio/omen)
[![Coverage](https://img.shields.io/coveralls/lighterio/omen/master.svg)](//coveralls.io/r/lighterio/omen)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//www.npmjs.com/package/standard)


Omen is a distributed data system, running within your load-balanced
Node.js service. It has redundant caching and storage, with hash ring
orchestration, eventual consistency and latency-optimized routing.

### Advantages

* Omen is part of your application. It frees you from installing,
  configuring and connecting to multiple data services.

* Omen uses the very stable and fast LevelDB database via the
  [leveldown](https://www.npmjs.org/package/leveldown) module for
  disk persistence.

* Modern web services have features such as load balancing,
  multi-region deployment, process management, monitoring, auto scaling,
  continuous integration and more. Omen is part of your service, so
  it gets your service's operational features for free.

* Omen is crazy fast, because:
  * Peers measure latency and use the fastest routes.
  * One ring handles caching and storage, so network requests are reduced.
  * In-process objects can be modified without deserialization.
  * Requests can route internally because clients can also be peers.
  * Frequently-written data can be pre-aggregated locally.
  * Frequently-accessed data can be cached globally.


#### Install Omen
```bash
npm install --save omen
```

#### Use Omen
```js
var server = require('za')().listen(8888);

var ring = require('omen')({
  hostPattern: 'app-(eu|use|usw|apn)-(1-5).lighter.io'
});

ring.set('foo', 'bar', function (err) {
  ring.get('foo', function (foo) {
    process.assert(foo == 'bar');
  });
});
```

## omen([options])

The `omen` library outputs a `ring` object on which ring methods are
called. A ring object is created with several options that govern the
ring's bootstrapping and behavior.

### options.processCount
The process count specifies the number of CPUs per host, and it defaults
to using all available CPUs.

### options.dataLocation
The database path is where LevelDB data is stored, with a subdirectory for
each worker. The default path is the **data** directory in the current working
directory.

### options.replicas
The replicas setting indicates the number of times to replicate a key-value
pair around the ring for redundancy. This number includes the main entry as
well as duplicates, so it must be at least 1, and the default is **5**.

### options.cacheSize
The cache size indicates the number of items to keep in LRU cache, with the
default being **10,000**.

### options.basePort
The base port is the first port on which processes will listen, with each
subsequent process incrementing that number by 1. The default is 12300. So
if a host has 4 processes and uses the default `basePort`, it will listen
on ports 12300, 12301, 12302 and 12303.

### options.hostPattern
The host pattern is used to bootstrap the host discovery process. It defaults
to the current hostname, so it must be set in order to allow multiple hosts
to interact.

The pattern supports parenthetical expressions which can be pipe-delimited
lists or a start and end number for a sequence. So if you had 10 hosts
across 2 US locales, your host pattern might look like:
`"omen-us(east|west)-(1-5).domain.tld"`.

### options.isClientOnly (Default: false)
If the current process needs to access the ring, but will not store data
as a peer, it should set `isClientOnly` to true. The default is **false**.


### options.pingDelay (Default: 1e3)
The ping delay is the number of milliseconds a peer waits between
attempts to discover all peers or heartbeats to a peer to verify the
connection and to measure latency. The default is **1,000** (one second).

### options.log
Omen can use a custom log. The default is **console**.


## ring

### ring.increment(key[, path, number, fn])

### ring.on()


## More on Omen...
* [Contributing](//github.com/lighterio/omen/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/omen/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/omen/blob/master/CHANGELOG.md)
* [Roadmap](//github.com/lighterio/omen/blob/master/ROADMAP.md)
