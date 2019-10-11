// server/app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// middlewares de logs
app.use((request, response, next) => {
    console.log('Method', request.method);
    console.log('Ip', request.ip);
    console.log('date', new Date());

    // let simulacaoErro = new Error('fodeu o servidor');
    // next(simulacaoErro);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('route'));

// customizando handler de notfound express
app.use((request, response, next) => {
    const err = new Error('Não achei esse carinha ai não mano !');
    err.status = 404;
    next(err);
});

// customizando handler de erro da aplicação
app.use((err, request, response, next) => {
    const status = err.status || 500;
    // imporimindo erro
    // response.status(status).json(err)
    response.status(status).json({
        err: err.message,
        errors: err.errors

    });

    /* istanbul ignore next */
    if (status !== 404) {
        // console.log("Erro: ", err.stack)
    }
});

module.exports = app;