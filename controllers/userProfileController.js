const Expenditure = require('../models/Expenditure');
const UserProfile = require('../models/UserProfile');
const async = require('async');

exports.getHome = (req, res) => {
  res.render('home');
};
// exports.getHome =  (req, res, next) => {
//   // async.parallel({
//   //   expenditures: (callback) => {
//   //     Expenditure.find({'userId': req.user._id})
//   //     .exec(callback)
//   },

//     userProfile: (callback) => {
//     UserProfile.find({'userId': req.user._id})
//     .exec(callback)
//  },

// }, function(err, results) {
//   if (err) { return next(err); } // Error in API usage.
//   if (results.userProfile == null || results.expenditures == null) { // No results.
//       const err = new Error(' User profile or expenditure not found');
//       err.status = 404;
//       return next(err);
//   }

//   let specificSums = {
//     housingSum: 0,
//     vehicleSum: 0,
//     utilitySum: 0,
//     childcareSum: 0,
//     grocerySum: 0,
//     diningSum: 0,
//     debtPaymentSum: 0,
//     retirementSum: 0,
//     miscellaneousSum: 0
//   }

//  let monthlyNecessities = 0;
//  let monthlyIndulgences = 0;

// adds Expenditure amounts to their respective categories
// e.g. necessity vs indulgent and  the expenditure categories such as housing vs vehicle
// results.expenditures.forEach(exp => {
//   if(exp.necessity === true){
//     monthlyNecessities += exp.amount;
//   }
//   else {
//     monthlyIndulgences += exp.amount;
//   }
//   switch (exp.category) {
//     case 'housing':
//       specificSums.housingSum += exp.amount;
//     break;

//     case 'vehicle':
//     specificSums.vehicleSum += exp.amount;
//     break;

//     case 'utilites':
//     specificSums.utilitySum += exp.amount;
//     break;

//     case 'childcare':
//     specificSums.childcareSum += exp.amount
//     break;

//     case 'groceries':
//     specificSums.grocerySum += exp.amount;
//     break;

//     case'dining':
//     specificSums.diningSum += exp.amount;
//     break;

//     case 'debtPayment':
//     specificSums.debtPaymentSum += exp.amount;
//     break;

//     case 'retirement':
//     specificSums.retirementSum += exp.amount;

//     case 'miscellaneous':
//     specificSums.miscellaneousSum += exp.amount;
//     break;
//   }

// });

exports.postAddExpenditure = async (req, res, next) => {
  const expenditure = await new Expenditure({
    title: req.body.expTitle,
    amount: req.body.expAmount,
    necessity: req.body.expSpendingType,
    category: req.body.expCategory,
    userId: req.user._id,
  }).save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/home');
  });
};

exports.getYearly = (req, res, next) => {
  res.render('yearly', { user: req.user });
};
