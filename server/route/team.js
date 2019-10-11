// server/route/team.js

const router = require('express').Router();
const TeamController = require('controllers/TeamController');
const jwt = require('../middleware/jwt')
const validator = require('../middleware/validator')

const mIdMid = (request, response, next) => {
    if (request.params.id.length !== 24) {
        const err = new Error('invalid mongo id !');
        err.status = 422;
        return next(err);
    }
    next();
};

router.get('/', jwt.verify, TeamController.list);

router.get('/:id', mIdMid, TeamController.getById);

router.post('/', validator.userSchema, validator.middleware, TeamController.create);

router.put('/:id', TeamController.update);

router.delete('/:id', TeamController.delete);

module.exports = router;