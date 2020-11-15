const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bycryptjs = require('bcryptjs');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    validate: {
      validator: function(value) {
        return validator.isAlphanumeric(value);
      },
      message: function() {
        return 'Format of username is not valid';
      }
    }
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    validate: {
      validator: function(value) {
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if(!regName.test(value)) {
          return false;
        } else {
          return true;
        }
      },
      message: function() {
        return 'Format of name is not valid';
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  accountNumber: {
    type: String,
    default: Math.floor(Date.now() * Math.random())
  },
  tokens: [
      {
          token: {
              type: String
          },
          createdAt: {
              type: Date,
              default: Date.now
          }
      }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;