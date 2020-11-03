const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const expenditureSchema = new Schema(
  {
    amount: {type: Number, maxlength: 50},
    necessity: {type: Boolean},
    date: {type: Date, default: Date.now},
    category: {type: String, maxlength: 100},
    userId: {type: String} 
  }
);

 
module.exports = mongoose.model('Expenditure', expenditureSchema);
