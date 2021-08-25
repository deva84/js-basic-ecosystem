require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'yahoo';

module.exports.authMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).end();
    const [tokenType, token] = header.split(' ');
    if (!token) return res.status(401).end();

    try {
        const verification = jwt.verify(token, jwtSecret);
        req.user = verification;
        next();

    } catch {
        res.status(401).end();
    }
}

