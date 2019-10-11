const app = require('app');
const request = require('supertest')(app);
const assert = require('assert');
const db = require('../server/config/mongo')

describe('CRUD team', () => {

    let id;
    let team = { name: "Piraporinha" };
    let token;

    before(() => {
        request
            .post('/auth')
            .send({ user: 'admin', pass: 'caneta' })
            .then(result => {
                token = result.body.token;
            })
    });

    beforeEach((done) => {
        team = { name: "Piraporinha" }

        db.collection('teams').insert(team, (err, data) => {
            id = String(data._id)
            done()
        });
    });

    afterEach((done) => {
        db.collection('teams').remove({}, done)
    });

    it('GET /team should list', () => {
        return request
            .get('/team')
            .set('x-jwt', token)
            .then(result => {
                assert.equal(200, result.status)
                assert.ok(result.body.items.length > 0)
                assert.ok(result.body.total > 0)
                assert.ok(result.body.items[0].name)
            })
    })
    it('GET /team/:id of a invalid id (menor)', () => {
        return request
            .get('/team/banana')
            .then(result => {
                assert.equal(result.status, 422)
                assert.equal(result.body.err, 'invalid mongo id !')
            })
    })
    it('GET /team/:id show a team', () => {
        return request
            .get(`/team/${id}`)
            .then(result => {
                assert.equal(result.status, 200)
                assert.equal(result.body.name, 'Piraporinha')
            })
    })
    it('POST /team creates a team', () => {
        let team = { name: "SoneparTeam" }
        return request.post('/team')
            .send(team)
            .then(result => {
                assert.equal(result.status, 201)
                assert.equal(result.body.name, 'SoneparTeam')
            })
    })
    it('PUT /team/:id updates a team', () => {
        let team = { name: "SoneparTeam" }
        return request.put(`/team/${id}`)
            .send(team)
            .then(result => {
                assert.equal(result.status, 200)
                assert.deepEqual(result.body, {
                    ok: 1,
                    nModified: 1,
                    n: 1
                })
            })
    })
    it('DELETE /team/:id remove a team', () => {
        return request
            .delete('/team/5d99ea8da0b2381eda1f8add')
            .then(result => {
                assert.equal(result.status, 204)
            })
    })
});