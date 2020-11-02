const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { body, validationResult } = require("express-validator");



// get sign up form
exports.getSignUp = (req, res) => {
  res.render('sign-up-form');
};



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
    })

    bcrypt.hash(req.body.password, 10, (err, hashedPashword) => {
        user.password = hashedPashword;
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
               res.render('sign-up-form', {user: user, emailErr: 'Email  in use'});
             }
             else {
               user.save(function (err) {
                 if (err) { return next(err); }
                  res.redirect('/profile-set-up');
               });
             };
          });
     }
     
  }

];

// get profile set up page
exports.getProfileSetUp = (req, res) => {
  console.log(res.locals.currentUser);
  res.render('profile-set-up');
};

// post profile set up page
exports.postProfileSetUp = (req, res) => {
  
  let currentUser = res.locals.currentUser;
  console.log("POST ON CURRENT USER: " + currentUser)
  User.findOneAndUpdate({_id: currentUser._id},
   {
      salary: req.body.salary,
      housingPayment: req.body.housingPayment,
      housingInsurance: req.body.housingInsurance,
      vehicleLoan: req.body.vehicleLoan,
      vehicleInsurance: req.body.vehicleInsurance,
      cellPlan: req.body.cellPlan,
      cellLoan: req.body.cellLoan,
      internetPlan:req.body.internetPlan, 
      childcareTuition: req.body.childcareTuition,
      childcareDaycare:req.body .childcareDaycare,
      internetPlan: req.body.internetPlan,
      healthInsurance:req.body.healthInsurance, 
      debtStudent: req.body.debtStudent,
      debtCredit: req.body.debtCredit,
      retirement401k: req.body.retirement401k,
      retirementIra: req.body.retirementIra,
      retirementBrokerage: req.body.retirementBrokerage
    },
      (err, result) => {
    if(err){
      res.send(err)
    } else {
      console.log(currentUser);
      res.redirect('/home')
    }
  })

}









// const housingRent = req.body.housingRent;
  // const housingInsurance = req.body.housingInsurance;
  // const vehicleLoan = req.body.vehicleLoan;
  // const vehicleInsurance = req.body.vehicleInsurance;
  // const cellPlan = req.body.cellPlan;
  // const cellLoan = req.body.cellLoan;
  // const cellInternet = req.body.cellInternet;
  // const childcareTuition = req.body.childcareTuition;
  // const childcareDaycare = req.body.childcareDaycare;
  // const healthInsurance = req.body.healthInsurance;
  // const debtStudent = req.body.debtStudent;
  // const debtCredit = req.body.debtCredit;
  // const retirement401k = req.body.retirement401k;
  // const retirementIra = req.body.retirementIra;
  // const retirementBrokerage = req.body.retirementBrokerage;
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