const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
// route imports
const indexRoutes = require('./routes/indexRoute');
const signupRoutes = require('./routes/signupRoute'); 
const loginRoutes = require('./routes/loginRoute');
const logoutRoutes = require('./routes/logoutRoute');
const userProfileRoutes = require('./routes/userProfileRoute');
 
//models 
const User = require('./models/user');

const app = express(); 

// database connect
const mongooseConnect = mongoose.connect('mongodb+srv://wes123:wes123@cluster.34hab.mongodb.net/budget?retryWrites=true&w=majority',
 { useNewUrlParser: true , useUnifiedTopology: true},
 () => console.log('connected to database'));
 
 passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});


app.use(indexRoutes);  
app.use(signupRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(userProfileRoutes);

const port = process.env.port || 4000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  })
