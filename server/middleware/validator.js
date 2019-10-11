const { check, validationResult } = require('express-validator');

const validator = {
    userSchema: [
        check('name').isLength({ min: 3 })
    ],
    middleware(request, response, next) {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            let err = new Error('invalid user')
            err.errors = errors.array()
            err.status = 400
            return next(err)
        }
        next();
    }
}

module.exports = validator;