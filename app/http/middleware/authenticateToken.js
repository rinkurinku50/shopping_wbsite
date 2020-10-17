const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).send({
            error: 'Token is required...'
        });
    }

    jwt.verify(token, 'secret123', (err, user) => {
        console.log(err);
        if (err) return res.status(401).send({
            error: err
        });;
        console.log(`My Token Data $user`);
        next();
    });


}

module.exports = authenticateToken;