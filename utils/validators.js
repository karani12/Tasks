// utils/validators.js
const { check } = require('express-validator');

const registerValidation = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('passwordConfirm', 'Passwords must match').custom((value, { req }) => value === req.body.password),
];

const loginValidation = [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];

module.exports = {
  registerValidation,
  loginValidation,
};
