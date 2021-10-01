const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// route imports
const indexRoute = require('./routes/indexRoute');
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const logoutRoute = require('./routes/logoutRoute');
const profileSetUpRoute = require('./routes/profileSetUpRoute');
const userProfileRoute = require('./routes/userProfileRoute');

//models
const User = require('./models/User');

const app = express();

// database connect
mongoose.connect(
  'mongodb+srv://wes123:wes123@cluster.34hab.mongodb.net/budget?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database')
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// passport / session middleware -- authenticates and remembers users
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoute);
app.use(signupRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(profileSetUpRoute);
app.use(userProfileRoute);

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
