const express = require('express');
const { loginUser, seedUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginUser);

router.post('/seed', seedUsers);

module.exports = router;
