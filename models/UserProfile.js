const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema (
  
  {
    salary : {type: Number, maxlength:100},
    salarySchedule: {type: String},

    housingPayment: {
      amount: {type:Number}, 
      category: {type: String, default: 'housing'}
    },
    housingInsurance: {
      amount: {type:Number}, 
      category: {type: String, default: 'housing'}
    },
    vehicleLoan: {
      amount: {type:Number}, 
      category: {type: String, default: 'vehicle'}
    },
    vehicleInsurance: {
      amount: {type:Number}, 
      category: {type: String, default: 'vehicle'}
    },
    cellPlan: {
      amount: {type:Number}, 
      category: {type: String, default: 'utilities'}
    },
    cellLoan: {
      amount: {type:Number}, 
      category: {type: String, default: 'utilities'}
    },
    internetPlan: {
      amount: {type:Number}, 
      category: {type: String, default: 'utilities'}
    },
    childcareTuition: {
      amount: {type:Number}, 
      category: {type: String, default: 'childcare'}
    },
    childcareDaycare: { 
      amount: {type:Number}, 
      category: {type: String, default: 'childcare'}
    },
    healthInsurance: {
      amount: {type:Number}, 
      category: {type: String, default: 'healthInsurance'} 
    },
    debtStudent: {
      amount: {type:Number}, 
      category: {type: String, default: 'debtPayment'}
    },
    debtCredit: {
      amount: {type:Number}, 
      category: {type: String, default: 'debtPayment'}
    },
    retirement401k: {
      amount: {type:Number}, 
      category: {type: String, default: 'retirement'}
    },
    retirementIra: {
      amount: {type:Number}, 
      category: {type: String, default: 'retirement'}
    },
    retirementBrokerage: {
      amount: {type:Number}, 
      category: {type: String, default: 'retirement'}
    },
    userId: {type: String},
  }
);

UserProfileSchema.virtual('monthlyTakeHome')
.get(function () {
  if (this.salarySchedule == 'weekly') {
    return this.salary * 4;
  }
  else if (this.salarySchedule === 'biMonthly') {
    return this.salary * 2;
  }
  else {
    return this.salary;
  }
});

UserProfileSchema.virtual('expenseSum')
.get(function () {
  let sum = 0;
  return sum = this.housingPayment.amount +
               this.housingInsurance.amount +
               this.vehicleLoan.amount + 
               this.vehicleInsurance.amount +
               this.cellPlan.amount +
               this.cellLoan.amount +
               this.internetPlan.amount +
               this.childcareTuition.amount +
               this.childcareDaycare.amount +
               this.healthInsurance.amount +
               this.debtStudent.amount +
               this.debtCredit.amount +
               this.retirement401k.amount +
               this.retirementIra.amount +
               this.retirementBrokerage.amount;
});

UserProfileSchema.virtual('categorySums')
.get(function () {
  const categorySums = {
    housingSum: this.housingPayment.amount + this.housingInsurance.amount,
    vehicleSum: this.vehicleLoan.amount + this.vehicleInsurance.amount,
    utilitySum: this.cellPlan.amount + this.cellLoan.amount + this.internetPlan.amount,
    childcareSum: this.childcareTuition.amount + this.childcareDaycare.amount,
    healthInsuranceSum: this.healthInsurance.amount,  
    debtPaymentSum: this.debtStudent.amount + this.debtCredit.amount,
    retirementSum: this.retirement401k.amount + this.retirementIra.amount + this.retirementBrokerage.amount,
  }
  return categorySums; 

}) 

// housingSum: 0,
// vehicleSum: 0,
// utilitySum: 0,
// grocerySum: 0,
// diningSum: 0,
// miscellaneousSum: 

 
module.exports = mongoose.model('UserProfile', UserProfileSchema);
