const mongoose = require('mongoose');
require('dotenv').config();
const database = process.env.DATABASE;

const setUpDb = () => {
    mongoose.connect(database,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
        .then(res => {
            console.log('connected to db');
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = setUpDb ;