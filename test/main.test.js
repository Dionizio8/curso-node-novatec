const app = require('app');
const request = require('supertest')(app);
const assert = require('assert');

describe('main tests', () => {
    it('GET / should respond 200', () => {
        // throw new Error('deu ruin =/')
        return request.get('/')
            .then(result => {
                assert.equal(200, result.status)
            })
    })

    it('GET /contato should respond 200', () => {

        return request
            .get('/contato')
            .then(result => {
                assert.equal('text/html; charset=utf-8', result.headers['content-type'])
                assert.equal(201, result.status)
                assert.equal('Pagina de Contato', result.text)
            });
        _
    })

    it('GET /banana should throw not found', () => {

    })
})