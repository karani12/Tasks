const express = require('express');
const { register, login, logout } = require('../controllers/AuthController');
const { registerValidation, loginValidation } = require('../utils/validators');
const auth = require('../middleware/AuthMiddleware');
const rateLimiter = require('../middleware/RateLimiter');

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, rateLimiter, login);
router.post('/logout', auth, logout);

module.exports = router;
