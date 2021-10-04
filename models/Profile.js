const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// rename categories from '...sum' to '...<better descripter>'
const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },

    paycheckAmount: { type: Number, required: true },
    salarySchedule: { type: String, required: true },

    housingExp: {
      total: { type: Number },
      housingPayment: {
        amount: { type: Number },
        category: { type: String, default: 'housing' },
      },
      housingInsurance: {
        amount: { type: Number },
        category: { type: String, default: 'housing' },
      },
    },
    vehicleExp: {
      total: { type: Number },
      vehicleLoan: {
        amount: { type: Number },
        category: { type: String, default: 'vehicle' },
      },
      vehicleInsurance: {
        amount: { type: Number },
        category: { type: String, default: 'vehicle' },
      },
    },
    utilityExp: {
      total: { type: Number },
      cellPlan: {
        amount: { type: Number },
        category: { type: String, default: 'utilities' },
      },
      cellLoan: {
        amount: { type: Number },
        category: { type: String, default: 'utilities' },
      },
      internetPlan: {
        amount: { type: Number },
        category: { type: String, default: 'utilities' },
      },
    },
    childcareExp: {
      total: { type: Number },
      childcareTuition: {
        amount: { type: Number },
        category: { type: String, default: 'childcare' },
      },
      childcareDaycare: {
        amount: { type: Number },
        category: { type: String, default: 'childcare' },
      },
    },
    healthExp: {
      total: { type: Number },
      healthInsurance: {
        amount: { type: Number },
        category: { type: String, default: 'healthInsurance' },
      },
    },
    debt: {
      total: { type: Number },
      debtStudent: {
        amount: { type: Number },
        category: { type: String, default: 'debtPayment' },
      },
      debtCredit: {
        amount: { type: Number },
        category: { type: String, default: 'debtPayment' },
      },
    },
    retirement: {
      total: { type: Number },
      retirement401k: {
        amount: { type: Number },
        category: { type: String, default: 'retirement' },
      },
      retirementIra: {
        amount: { type: Number },
        category: { type: String, default: 'retirement' },
      },
      retirementBrokerage: {
        amount: { type: Number },
        category: { type: String, default: 'retirement' },
      },
    },
    expenditures: [
      {
        title: { type: String, maxlength: 30, required: true },
        amount: { type: Number, required: true },
        necessity: { type: Boolean, default: false, required: true },
        category: { type: String, maxlength: 30, required: true },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//
profileSchema.virtual('monthlyTakeHome').get(function () {
  let monthlyTakeHome = 0;
  switch (this.salarySchedule) {
    case 'weekly':
      monthlyTakeHome = this.paycheckAmount * 4;
      break;
    case 'bi-weekly':
      monthlyTakeHome = this.paycheckAmount * 2;
      break;
    case 'monthly':
      monthlyTakeHome = this.paycheckAmount;
      break;
  }
  return monthlyTakeHome;
});

profileSchema.virtual('totalMonthlyExpenses').get(function () {
  return (
    this.housingExp.total +
    this.vehicleExp.total +
    this.utilityExp.total +
    this.childcareExp.total +
    this.healthExp.total
  );
});

module.exports = mongoose.model('profile', profileSchema);
