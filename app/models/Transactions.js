const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  value: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref : 'User'
  }
});

transactionSchema.statics.getTransactions = function(id, token) {
  console.log('in the tr', token, id)

}

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;