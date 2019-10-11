const redis = require('redis');

const db = redis.createClient({
  host: '10.0.2.179',
  port: 6379,
});

db.on('error', (err) => {
  console.log(`Error ${err}`);
});

module.exports = db;
