const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const Schema = mongoose.Schema;


const expenditureSchema = new Schema(
  {
    title: {type: String, maxlength: 30, required: true},
    amount: {type: Number, maxlength: 50, required: true},
    necessity: {type: Boolean, required: true},
    category: {type: String, maxlength: 100, required: true},
    timeStamp: {type: Date, default: Date.now},
    userId: {type: String} 
  }
);



expenditureSchema.virtual('date')
.get(function() {
  return DateTime.fromJSDate(this.timeStamp).toLocaleString(DateTime.DATE_MED);
})

 
module.exports = mongoose.model('Expenditure', expenditureSchema);
