const axios = require('axios');
const redis = require('config/redis');

const CrawlerController = {
  cacheMiddleware(request, response, next) {
    const { link } = request.query;
    const key = `gabriel:${encodeURIComponent(link)}`;

    redis.get(key, (err, data) => {
      if (data) {
        console.log('Peguei do cach');
        return response.send(data);
      }
      next();
    });
  },
  craw(request, response, next) {
    const { link } = request.query;
    const key = `gabriel:${encodeURIComponent(link)}`;

    console.log('Fui lá buscar o site de novo !');

    axios.get(link)
      .then((result) => {
        redis.set(key, result.data, 'EX', 120);

        response.status(result.status);
        response.send(result.data);
      })
      .catch(next);
  },
};

module.exports = CrawlerController;
