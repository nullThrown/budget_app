const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultedStr = { type: String, default: '' };
const defaultedNum = { type: Number, default: 0 };

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },

    paycheckAmount: defaultedNum,
    salarySchedule: defaultedStr,
    recurringPayments: [
      {
        total: { type: Number },
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
    categories: [{ type: String }],
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
