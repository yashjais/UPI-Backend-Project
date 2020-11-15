const User = require('../models/User')
const _ = require('lodash')

module.exports.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  user.save()
    .then(user => {
        res.json(_.pick(user, ['name', 'username', 'accountNumber']));
    })
    .catch(err => {
        res.json(err);
    })
}

module.exports.login = (req, res) => {
  const body = req.body;
  User.findByCredentials(body.username, body.password) // static/class method
    .then(function(user) {
      return user.generateToken(); // instance/object method
    })
    .then(function(token) {
      res.send(token);
      // res.setHeader('x-auth', token).send({})        
    })
    .catch(function(err) {
      // we have to manually form the err coz err is promise rejection and will send empty obj on frontend.. if someone is sending passsword from frontend then this error will be invoked -- catching two errors -- will have to reformat
      // res.send('Format of username and password is wrong');
      res.send(err);
    })
}