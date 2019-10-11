const router = require('express').Router();
const jwt = require('middleware/jwt');

router.post('/', jwt.auth);

module.exports = router;