const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredStr,
  requiredNum,
  defaultedStr,
  defaultedNum,
  requiredBool,
} = require('./fieldTypes');

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },

    paycheckAmount: defaultedNum,
    salarySchedule: defaultedStr,
    recurringPayments: [
      {
        total: defaultedNum,
        budget: defaultedNum,
        category: defaultedStr,
        payments: [
          {
            amount: defaultedNum,
            name: defaultedStr,
          },
        ],
      },
    ],
    categories: [
      {
        title: requiredStr,
        budget: requiredNum,
        isDisplayed: { type: Boolean, default: true },
        spent: defaultedNum,
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

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

module.exports = mongoose.model('profile', profileSchema);
