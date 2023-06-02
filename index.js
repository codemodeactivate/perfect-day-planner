require('dotenv').config(); //for "Shareable Link Generation" on Github project board
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
//const helpers = require('./helpers');

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html', 'css'] }));
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  defaultLayout: 'main',
  //helpers: helpers,
  partialsDir: 'views/partials',
  layoutsDir: 'views/layouts'
});

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening, BANG'));
});
