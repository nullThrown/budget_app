const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

passport.use(
  
  // initializing local strategy -- user validation
  new LocalStrategy({ usernameField: 'email',passwordField: 'password'},
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) { 
        return done(err); 
      };
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, {msg: "Incorrect password"})
        }
      });
    });
  })
);  
 

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
); 


module.exports = router; 