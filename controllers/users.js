const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { body, validationResult } = require("express-validator");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// get sign up form
exports.getSignUp = (req, res) => {
  res.render('sign-up-form');
};



passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) { 
        return done(err);
      };
      if (!user) {
        return done(null, false, { msg: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, {msg: "Incorrect password"})
        }
      });
    });
  })
);



// post sign up form
exports.postSignUp = [
  // validation / sanitation
  body('name', ' Name is required').trim().isLength({ min: 1 }).escape(),
  body('email', 'Not a valid email ').trim().isEmail().escape(),
  body('password', 'Password must be 8 characters').trim().isLength({min:8}).escape(),
  
  (req, res, next) => {
    const errors = validationResult(req); 

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
 
    if(!errors.isEmpty()) {
      res.render('sign-up-form', { user: user, errors: errors.array() })
      return;
    }
    else {
      // checks if email is already in use
      User.findOne({ 'email': req.body.email })
          .exec( function(err, found_email) {
             if (err) { return next(err); }
  
             if (found_email) {
               res.render('sign-up-form', {user: user, emailErr: 'Email already in use'});
             }
             else {
               user.save(function (err) {
                 if (err) { return next(err); }
          
               });
             };
          });
     }
     
  }

];

// get profile set up page
exports.getProfileSetUp = (req, res) => {
  res.render('profile');
};

// post profile set up page
exports.postProfileSetUp = (req, res) => {
  const incomeSalary = req.body.salary;
  const housingRent = req.body.housingRent;
  const housingInsurance = req.body.housingInsurance;
  const vehicleLoan = req.body.vehicleLoan;
  const vehicleInsurance = req.body.vehicleInsurance;
  const cellPlan = req.body.cellPlan;
  const cellLoan = req.body.cellLoan;
  const cellInternet = req.body.cellInternet;
  const childcareTuition = req.body.childcareTuition;
  const childcareDaycare = req.body.childcareDaycare;
  const healthInsurance = req.body.healthInsurance;
  const debtStudent = req.body.debtStudent;
  const debtCredit = req.body.debtCredit;
  const retirement401k = req.body.retirement401k;
  const retirementIra = req.body.retirementIra;
  const retirementBrokerage = req.body.retirementBrokerage;
  // const userProfile = new UserProfile (incomeSalary, housingRent, housingInsurance, vehicleLoan,
  //    vehicleInsurance, cellPlan, cellLoan, 
  //   cellInternet, childcareTuition, childcareDaycare, healthInsurance, debtStudent, debtCredit, retirement401k, retirementIra, retirementBrokerage);
  // userProfile.save()
  // .then(result => {
  //   console.log('user profile submitted');
  //   res.redirect('/home');
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}