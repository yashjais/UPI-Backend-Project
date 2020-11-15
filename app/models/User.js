const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
require('dotenv').config();
const jwtSignature = process.env.JWT;

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
    default: Math.floor(Date.now() * Math.random()),
    unique: true
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

userSchema.statics.findByCredentials = function (username, password) {
  const User = this;
  return User.findOne({ username })
    .then(function (user) {
      if (!user) {
        return Promise.reject('invalid username/password');
      } else {
          return bcryptjs.compare(password, user.password)
            .then(function (result) {
              if (result) {
                return Promise.resolve(user);
              } else {
                return Promise.reject('invalid username/password');
              }
            })
            .catch(function (err) {
              return Promise.reject(err);
            })
        }
    })
    .catch(err => {
      return Promise.reject(err);
    })
}

userSchema.methods.generateToken = function() {
  const user = this;
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date())
  };
  const token = jwt.sign(tokenData, jwtSignature);
  user.tokens.push({ token });
  return user.save()
    .then(function (user) {
      return Promise.resolve(token);
    })
    .catch(function (err) {
      return Promise.reject(err);
    })
}

// pre hooks
userSchema.pre('save', function(next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10)
      .then(salt => {
        bcryptjs.hash(user.password, salt)
          .then(encryptedPassword => {
            user.password = encryptedPassword;
            next();
          })
      })
  } else {
      next();
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;