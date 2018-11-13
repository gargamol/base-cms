const broker = require('./broker');
const service = require('./service');
const mongodb = require('./mongodb');
const { name, version } = require('../package.json');

const { log } = console;

broker.createService(service);

const run = async () => {
  log(`Starting '${name}' v${version} ...`);
  const client = await mongodb.connect();
  log(`BaseCMS DB connected to ${client.s.url}`);

  broker.middlewares.add({
    stopped() {
      return client.close().then(() => {
        log('BaseCMS DB closed.');
      }).catch(e => setImmediate(() => { throw e; }));
    },
  });

  await broker.start();
  log('> Service ready');
};
run().catch(e => setImmediate(() => { throw e; }));
