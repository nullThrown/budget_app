const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredStr = { type: String, default: '' };
const requiredNum = { type: Number, default: 0 };

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },

    paycheckAmount: requiredNum,
    salarySchedule: requiredStr,
    recurringPayments: [
      {
        total: requiredNum,
        budget: requiredNum,
        category: requiredStr,
        payments: [
          {
            amount: requiredNum,
            name: requiredStr,
          },
        ],
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
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
