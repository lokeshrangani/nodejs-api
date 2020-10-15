const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

function authenticateJWT (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, email) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.email = email;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}