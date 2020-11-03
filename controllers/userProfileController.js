const Expenditure = require('../models/Expenditure');


exports.getHome = async (req, res) => {
  await  res.render('home', {user: req.user});
};  

exports.postAddExpenditure = async (req, res) => {
    const expenditure = await new Expenditure({

        amount: req.body.amount,
        necessity: req.body.spendingType,
        category: req.body.category,
        userId: req.user._id 
      })
      .save(function (err) {
        if (err) { return next(err); }
        console.log(expenditure);
        res.redirect('/home');
      })
};      