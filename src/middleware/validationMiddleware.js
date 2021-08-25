const {check, validationResult} = require('express-validator');

async function validateRegistration(req, res, next) {
    await check('email').isEmail().run(req);
    await check('password').isLength({ min: 6 }).run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    next();
}

async function validateBodyParams(req, res, next) {
    await check('title').isString().run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    next();
}

module.exports = { validateRegistration, validateBodyParams };