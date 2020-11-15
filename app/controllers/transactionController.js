const Transaction = require('../models/Transactions')
const _ = require('lodash')

module.exports.getTransaction = (req, res, next) => {
  Transaction.find({ user: req.user._id })
    .then((response) => {
        console.log('in the transaction and logging the res', response)
        res.json(response);
    })
    .catch(err => {
        res.json(err);
    })
};

module.exports.createTransaction = (req, res, next) => {
  const body = req.body;
  const transaction = new Transaction(body);
  transaction.user = req.user._id;
  transaction.save() 
    .then(transaction => {
      res.json(transaction);
    })
    .catch(err => {
      res.json(err);
    })
}