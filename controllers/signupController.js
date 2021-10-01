const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const obj = {};

obj.newFunction = () => {
  console.log('hello');
}

exports.getSignup = (req, res) => {
  res.render('sign-up-form'); 
};


exports.postSignup = [
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
      // validation error check
    if(!errors.isEmpty()) {   
      res.render('sign-up-form', { user: user, errors: errors.array() });
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
                  req.login(user, function(err) {
                    if(err){
                      res.redirect('/');  
                    }
                    else {
                      res.redirect('profile-set-up');
                    }
                  }) 
               });
             };
          });
     }     
  }
];
