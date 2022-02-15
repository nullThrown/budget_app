const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredStr,
  requiredNum,
  defaultedStr,
  requiredBool,
  dateNow,
} = require('./fieldTypes');

const expensesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    data: [
      {
        title: { ...requiredStr, maxlength: 30 },
        amount: requiredNum,
        description: { ...defaultedStr, maxlength: 50 },
        necessity: requiredBool,
        category: defaultedStr,
        date: dateNow,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('expense', expensesSchema);
