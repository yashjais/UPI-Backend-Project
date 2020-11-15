const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const transactionController = require('../app/controllers/transactionController');
const authenticateUser = require('../app/middlewares/authenticateUser');

router.post('/register', usersController.register);
router.post('/login', usersController.login);

router.get('/transaction', authenticateUser, transactionController.getTransaction);
router.post('/transaction', authenticateUser, transactionController.createTransaction);

module.exports = router;