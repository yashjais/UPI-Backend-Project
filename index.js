const express = require('express')
const setUpDB = require('./config/database')
const router = require('./config/routes')
require('dotenv').config();

const app = express();
const port = process.env.PORT;

setUpDB();

app.get('/', (req, res) => {
    res.json('welcome to the website')
})
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log('listening on the port', port)
})