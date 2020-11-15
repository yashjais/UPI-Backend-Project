const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');

router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;