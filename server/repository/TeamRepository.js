const db = require('config/mongo');
const blueBird = require('bluebird');

const TeamRepository = {

    count(query, callback) {
        db.collection('teams').count(query, callback);
    },
    list(query, callback) {
        db.collection('teams').find(query, callback);
    },
    byId(id, callback) {
        const query = { _id: db.ObjectId(id) };
        db.collection('teams').findOne(query, callback);
    },
    create(data, callback) {
        db.collection('teams').insert(data, callback);
    },
    update(id, data, callback) {
        const query = { _id: db.ObjectId(id) };
        db.collection('teams').update(query, { $set: data }, callback);
    },
    delete(id, callback) {
        const query = { _id: db.ObjectId(id) };
        db.collection('teams').remove(query, callback);
    },
};

module.exports = blueBird.promisifyAll(TeamRepository);