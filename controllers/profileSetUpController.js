const UserProfile = require('../models/UserProfile');

// get profile set up page
exports.getProfileSetUp = (req, res) => {
  console.log(req.user);
  res.render('profile-set-up');
};

// post profile set up page
exports.postProfileSetUp = async (req, res, next) => {
  
   const userProfile = await new UserProfile (
    
   {
     obj :{
      amount: 250
     },
       
      salary : req.body.salary,
      salarySchedule : req.body.salarySchedule,
      
      housingPayment : {
      amount : req.body.housingPayment
      },
      housingInsurance: {
      amount : req.body.housingInsurance
      },
      vehicleLoan: {
      amount : req.body.vehicleLoan
      },
      vehicleInsurance: {
      amount : req.body.vehicleInsurance
      },
      cellPlan: { 
      amount : req.body.cellPlan
      },
      cellLoan: {
      amount : req.body.cellLoan
      },
      internetPlan: {
      amount : req.body.internetPlan
      }, 
      childcareTuition: {
      amount : req.body.childcareTuition
      },
      childcareDaycare: {
      amount : req.body .childcareDaycare
      },
      internetPlan: {
      amount : req.body.internetPlan
      },
      healthInsurance: {
      amount : req.body.healthInsurance 
      },
      debtStudent: {
      amount : req.body.debtStudent
      },
      debtCredit: { 
      amount : req.body.debtCredit
      },
      retirement401k: { 
      amount : req.body.retirement401k
      },
      retirementIra: { 
      amount : req.body.retirementIra 
      },
      retirementBrokerage: { 
      amount : req.body.retirementBrokerage
      },

      userId: req.user._id,

     
    })
    .save(function(err) {    
      if(err){  next(err); } 
        else { 
          console.log("This is the user profile: " + userProfile);
        res.redirect('/home');
      }
    });
};

exports.getTest = (req, res) => {
  res.render()
}



 // salary: req.body.salary,
      // salarySchedule: req.body.salarySchedule,
      // housingPayment: req.body.housingPayment,
      // housingInsurance: req.body.housingInsurance,
      // vehicleLoan: req.body.vehicleLoan,
      // vehicleInsurance: req.body.vehicleInsurance,
      // cellPlan: req.body.cellPlan,
      // cellLoan: req.body.cellLoan,
      // internetPlan:req.body.internetPlan, 
      // childcareTuition: req.body.childcareTuition,
      // childcareDaycare:req.body .childcareDaycare,
      // internetPlan: req.body.internetPlan,
      // healthInsurance:req.body.healthInsurance, 
      // debtStudent: req.body.debtStudent,
      // debtCredit: req.body.debtCredit,
      // retirement401k: req.body.retirement401k,
      // retirementIra: req.body.retirementIra,
      // retirementBrokerage: req.body.retirementBrokerage,
      // userId: req.user._id