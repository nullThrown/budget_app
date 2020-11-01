const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const router = express.Router();





passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) { 
        console.log(err)
        return done(err);
      };
      if (!user) {
        console.log('no user')
        return done(null, false, { msg: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          console.log('users match');
          return done(null, user);
        } else {
          console.log('users do not match');
          // passwords do not match!
          return done(null, false, {msg: "Incorrect password"})
        }
      });
    });
  })
);


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/', (req, res) => {
  res.render('index');
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
  })

); 


module.exports = router; 