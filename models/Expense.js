const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  data: [
    {
      title: { type: String, maxlength: 30, required: true },
      amount: { type: Number, required: true },
      description: String,
      necessity: { type: Boolean, default: false, required: true },
      category: { type: String, maxlength: 30, required: true },
      date: { type: Date, default: Date.now() },
    },
  ],
});

module.exports = mongoose.model('expense', expensesSchema);
