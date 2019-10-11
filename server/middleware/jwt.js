const jwt = require('jwt-simple')
const SECRET = 'novatec-turma-sabado';

function tomorrow() {
    return Date.now() + 24 * 60 * 60 * 1000;
}

const jwtMid = {
    verify(request, response, next) {
        const token = request.headers['x-jwt'] || request.query.toke;

        try {
            const decoded = jwt.decode(token, SECRET, true);

            //validade do token
            if (decoded.expires_at < new Date()) {
                throw new Error('expirou')
            }

            request.authorization = decoded;
            next()
        } catch (e) {
            e.status = 401;
            next(e);
        }
    },
    auth(request, response, next) {

        // const user = request.body.user;
        // const pass = request.body.pass;

        const { user, pass } = request.body;

        if (user === 'admin' && pass === 'caneta') {

            let payload = {
                expires_at: tomorrow(),
                user,
                ape: 'temas novatec',
                roles: ['read', 'creat']
            }

            let token = jwt.encode(payload, SECRET)
            return response.json({ token })
        }

        let err = new Error("JWT errado irmão !")
        err.status = 401;
        next(err);
    }
}

module.exports = jwtMid;