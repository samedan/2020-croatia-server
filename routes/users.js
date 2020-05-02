const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/users');

// LOGIN
router.post('/login', login);

// Register
router.post('/register', register);

module.exports = router;
