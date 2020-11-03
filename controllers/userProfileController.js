const Expenditure = require('../models/Expenditure');


exports.getHome = async (req, res) => {
  await Expenditure.find({userId: req.user._id})
  .exec(function (err, userExpenditures)  {
    if(err){ 
      return next(err);
    }
   res.render('home', {user: req.user, expenditures: userExpenditures});
  })
};   

exports.postAddExpenditure = async (req, res) => {
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