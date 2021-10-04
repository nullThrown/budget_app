const Expenditure = require('../models/Expenditure');
const UserProfile = require('../models/Profile');
const async = require('async');

// db.Expenditure.aggregate([
//   {$project: {name: 1, month: {$month: '$bday'}}},
//   {$match: {month: 9}}
// ]);


 const month =  Expenditure.aggregate([
  {$project: { month: {$month: 'timeStamp'}}},
  {$match: {month: 11}}
])
// console.log(month._pipeline.$project)
 
exports.getHome =  (req, res, next) => {
  async.parallel({ 
    expenditures: (callback) => {
      Expenditure.find({'userId': req.user._id})
      .exec(callback) 
  },
  
  //Expenditures.find({'userId: req.user._id})
 
    // find expenditures by current userId
    // find current month = Number(1-12)
    // match current expenditures list and aggregate by current month var
    // return matched expenditures 


      userProfile: (callback) => {
      UserProfile.find({'userId': req.user._id})
      .exec(callback)  
   },    
 
  }, function(err, results) {
    if (err) { return next(err); } // Error in API usage.
    if (results.userProfile == null || results.expenditures == null) { // No results.
        const err = new Error(' User profile or expenditure not found');
        err.status = 404;
        return next(err); 
    }


    let specificSums = {
      housingSum: 0,
      vehicleSum: 0,
      utilitySum: 0,
      childcareSum: 0,
      grocerySum: 0,
      diningSum: 0,
      debtPaymentSum: 0,
      retirementSum: 0,
      miscellaneousSum: 0 
    }

   let monthlyNecessities = 0;
   let monthlyIndulgences = 0;

   // adds Expenditure amounts to their respective categories 
   // e.g. necessity vs indulgent and  the expenditure categories such as housing vs vehicle 
    results.expenditures.forEach(exp => {
      if(exp.necessity === true){
        monthlyNecessities += exp.amount;      
      }
      else {
        monthlyIndulgences += exp.amount;
      }
      switch (exp.category) {
        case 'housing':
          specificSums.housingSum += exp.amount;
        break;

        case 'vehicle': 
        specificSums.vehicleSum += exp.amount;
        break;

        case 'utilites':
        specificSums.utilitySum += exp.amount;
        break;

        case 'childcare': 
        specificSums.childcareSum += exp.amount
        break;

        case 'groceries':
        specificSums.grocerySum += exp.amount;
        break;

        case'dining': 
        specificSums.diningSum += exp.amount;
        break;

        case 'debtPayment': 
        specificSums.debtPaymentSum += exp.amount;
        break;

        case 'retirement': 
        specificSums.retirementSum += exp.amount;

        case 'miscellaneous':
        specificSums.miscellaneousSum += exp.amount;
        break;
      }
     
    });
  
    // to grab userProfile and loop over object values
    // array[0].key. category === "" then fill separate object, similar to the other object for the same values
    // perhaps even fill in the same object and then transport that object to the views page
    // console.log(specificSums);

exports.postAddExpenditure = async (req, res, next) => {
    const expenditure = await new Expenditure({
         
        title: req.body.expTitle, 
        amount: req.body.expAmount,
        necessity: req.body.expSpendingType,
        category: req.body.expCategory,
        userId: req.user._id    
      })
      .save(function (err) {
        if (err) { return next(err); }
        res.redirect('/home');
      })
};   

exports.getYearly = (req, res, next) => {
  res.render('yearly', {user: req.user})
}