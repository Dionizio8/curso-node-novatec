const router = require('express').Router();
const CrawlerController = require('controllers/CrawlerController');

const nome = 'Gabriel Dionizio Pereira';

router.get('/', (request, response, next) => {
    response.send('Olá !!!');
});

router.get('/contato', (request, response, next) => {
    response.status(201);
    response.send('Pagina de Contato');
});

// rotas do sistema
router.use('/team', require('route/team'));

//crawler com redis
router.get('/crawler', CrawlerController.cacheMiddleware, CrawlerController.craw);

//jwt
router.use('/auth', require('route/auth'));


module.exports = router;