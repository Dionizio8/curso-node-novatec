const numCpus = require('os').cpus().length;
const cluster = require('cluster');
const app = require('app');

if (cluster.isMaster) {
  for (let i = 0; i < numCpus; i++) {
    const worker = cluster.fork();
  }
} else {
  app.listen(3000, () => {
    console.log('server is up!');
  });
}
