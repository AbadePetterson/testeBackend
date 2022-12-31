console.info('[*] Loading environment variables...');
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const connectSessionSequelize = require("connect-session-sequelize");
const sequelize = require('../model/config');
//const bodyParser = require('body-parser');


// ------------------------------------------
// Basic configuration
// ------------------------------------------

const app = express();
const PORT = process.env.PORT;

app.use(express.json());  // request.body -> json
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


// ------------------------------------------
// Session configuration
// ------------------------------------------

// initalize sequelize with session store
const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
  //checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  checkExpirationInterval: 10 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});

// Session middleware
app.use(session({
  secret: process.env.SECRET_KEY,

  // Save to store if session is new but not modified.
  // Must be false for login sessions.
  saveUninitialized: false,

  // 1000 * 60 * 60 * 24   => Creating 24 hours from milliseconds
  cookie: {
    maxAge: Number(process.env.SESSION_MAX_AGE),
  },

  store: sessionStore,
  resave: false,

  //proxy: true, // if you do SSL outside of node.
}));

sessionStore.sync();  // creates table

const loginRequired = (req, res, next) => {
  if (req.session.username) {
    next();
  }
  else {
    res.statusCode = 401;
    res.json({ 'detail': 'User not authenticated' });
  }
}


// ------------------------------------------
// Exports
// ------------------------------------------

module.exports = { app, PORT, express, loginRequired };
