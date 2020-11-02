const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
  name: {type: String, maxlength:100, required: true},  
  email : {type: String, maxlength:50, required: true},
  password : {type: String, minlength:8, required: true},
  obj : {type: Objects} 
  }
); 
 

module.exports = mongoose.model('User', UserSchema);
