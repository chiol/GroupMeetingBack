//express
const express = require('express');
const app = express();

//middleware
const morgan = require('morgan')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}    

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.set("etag", false); // cache 처리 하지 않게 함 ex) 304

// router 
const user = require('./api/user')
const room = require('./api/room')
const chat = require('./api/chatting')
const db_input = require('./api/db_input')
app.use('/user',user)
app.use('/room',room)
app.use('/chatting',chat)
app.use('/db',db_input)

module.exports = app;