const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expendituresSchema = new Schema([
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    expenses: [
      {
        title: { type: String, maxlength: 30, required: true },
        amount: { type: Number, required: true },
        necessity: { type: Boolean, default: false, required: true },
        category: { type: String, maxlength: 30, required: true },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
]);

module.exports = mongoose.model('expenditures', expendituresSchema);
