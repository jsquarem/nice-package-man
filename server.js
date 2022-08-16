// load the env consts
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
//const cors = require('cors');
//const helmet = require('helmet');
// Routes
const indexRouter = require('./routes/index');
const collectionsRouter = require('./routes/collections');
const packagesRouter = require('./routes/packages');
const repositoriesRouter = require('./routes/repositories');
const snippetsRouter = require('./routes/snippets');
const apiRouter = require('./routes/api');
const profilesRouter = require('./routes/profiles');

const Profile = require('./models/profile');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NP,M API',
      version: '1.0.0',
      description: 'A simple Express CRUD API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/api.js'],
};
const specs = swaggerJsDoc(options);

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// mount the session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(passport.initialize());
app.use(passport.session());
const getProfile = async (id) => {
  const profiles = await Profile.find({ profileId: id }).exec();
  return profiles[0];
};

// Add this middleware BELOW passport middleware
app.use(async function (req, res, next) {
  res.locals.user = req.user;
  if (typeof req.user != 'undefined') {
    res.locals.user = await getProfile(req.user._id);
  }
  //res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/collections', collectionsRouter);
app.use('/', packagesRouter);
app.use('/', repositoriesRouter);
app.use('/', snippetsRouter);
app.use('/api', apiRouter);
app.use('/profiles', profilesRouter);

//app.use(helmet());
app.use(bodyParser.json());
//app.use(cors());

// invalid request, send 404 page
app.use(function (req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
