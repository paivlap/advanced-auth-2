'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views/pug')

let session=require('express-session')
let passport=require('passport')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (request, response ) => {
  response.render('index', { title: 'Hello', message: 'Please log in' })
})

//save user id to a cookie
passport.serializeUser((user, done) => {
  done(null, user._id);
});

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

