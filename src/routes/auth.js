const express = require('express');
const router = express.Router();

const { validateRegistration } = require('../middleware/validationMiddleware');
const { login, registration } = require('../controllers/AuthController');

router.post('/register', validateRegistration, registration);
router.post('/login', login);

module.exports = router;