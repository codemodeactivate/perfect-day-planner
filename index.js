const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const fs = require('fs');
const cors = require('cors');
const sequelize = require('./config/connection');
require ('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    isSelected: function (selectedOption) {
      return selectedOption === 'selected';
    },
  },
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
});

const sess = {
  secret: process.env.SECRET,
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.headerClass = req.url !== '/' ? 'scrolled' : '';
  next();
});

app.use((req, res, next) => {
  const navTemplate = hbs.handlebars.compile(fs.readFileSync('views/partials/nav.handlebars', 'utf-8'));
  const footerTemplate = hbs.handlebars.compile(fs.readFileSync('views/partials/footer.handlebars', 'utf-8'));

  res.locals.nav = navTemplate(req.session);
  res.locals.footer = footerTemplate(req.session);

  next();
});

app.use('/', routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening, BANG'));
});
