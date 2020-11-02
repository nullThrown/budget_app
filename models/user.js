const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
  name: {type: String, maxlength:100, required: true},  
  email : {type: String, maxlength:50, required: true},
  password : {type: String, minlength:8, required: true},
  salary : {type: Number, maxlength:100},
  housingPayment: {type: Number, maxlength: 100},
  housingInsurance: {type: Number, maxlength: 100},
  vehicleLoan: {type: Number, maxlength: 100},
  vehicleInsurance: {type: Number, maxlength: 100},
  cellPlan: {type: Number, maxlength: 100},
  cellLoan: {type: Number, maxlength: 100},
  internetPlan: {type: Number, maxlength: 100},
  childcareTuition: {type: Number, maxlength: 100},
  childcareDaycare: {type: Number, maxlength: 100},
  internetPlan: {type: Number, maxlength: 100},
  healthInsurance: {type: Number, maxlength: 100},
  debtStudent: {type: Number, maxlength: 100},
  debtCredit: {type: Number, maxlength: 100},
  retirement401k: {type: Number, maxlength: 100},
  retirementIra: {type: Number, maxlength: 100},
  retirementBrokerage: {type: Number, maxlength: 100},
  }
); 


 

module.exports = mongoose.model('User', UserSchema);
