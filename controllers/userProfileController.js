const Expenditure = require('../models/Expenditure');
const UserProfile = require('../models/UserProfile');
const async = require('async');



exports.getHome =  (req, res, next) => {
  async.parallel({
    expenditures: (callback) => {
      Expenditure.find({'userId': req.user._id})
      .exec(callback)
  },
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
    // refactor into single function that uses forEach and separates amounts into two separate variables 
    // sums all 'necessary' expenditures(monthly purchases)
    let monthlyNecessities = results.expenditures
    .filter(exp => exp.necessity === true )
    .reduce((a,b) =>a + b.amount, 0);
    
    // sums all 'necessary' expenditures(monthly purchases)    
    let monthlyIndulgences = results.expenditures
    .filter(exp => exp.necessity === false)
    .reduce((a, b) => a + b.amount, 0);

    let specificSums = {
      housingSum: 0,
      vehicleSum: 0,
      utilitySum: 0,
      grocerySum: 0,
      diningSum: 0,
      miscellaneousSum: 0
    }

   // combine this function with the top two and run a foreach function on the entirety with a little help fromt the man upstare
    results.expenditures.forEach(exp => {
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

        case 'groceries':
        specificSums.grocerySum += exp.amount;
        break;

        case'dining':
        specificSums.diningSum += exp.amount;
        break;

        case 'miscellaneous':
        specificSums.miscellaneousSum += exp.amount;
        break;

      }
    });

    // to grab userProfile and loop over object values
    // array[0].key. category === "" then fill separate object, similar to the other object for the same values
    // perhaps even fill in the same object and then transport that object to the views page

    console.log(results.userProfile);
    console.log(specificSums);
    res.render('home', {
       user: req.user,
       expenditures: results.expenditures,
       userProfile: results.userProfile,
       monthlyNecessities: monthlyNecessities,
       monthlyIndulgences: monthlyIndulgences
       });
      }  
  );
};    

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
        console.log(expenditure);
        res.redirect('/home');
      })
};      