// app.js

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

module.exports = (db) => {
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride('_method'));
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: db.client.s.options.url }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
  }));

  return app;
};
