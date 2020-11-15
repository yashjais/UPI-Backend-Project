const express = require('express');
const router = express.Router();

// const authenticateUser = require('../app/middlewares/authentication')
// const usersController = require('../app/controllers/UsersController')
// // const {list, create} = require('../app/controllers/UsersController') also works but in the then you have to use - router.post('/register', usersController.create)

// // router.get('/login', list) // not a valid router, just experimenting
// router.post('/user/register', usersController.register)
// router.post('/user/login', usersController.login)
// router.get('/user/account',authenticateUser, usersController.account)
// router.delete('/user/logout', authenticateUser, usersController.logout)

module.exports = router;