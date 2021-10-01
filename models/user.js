const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, maxlength: 100, required: true },
  lastName: { type: String, maxlength: 100, required: true },
  email: { type: String, maxlength: 50, required: true },
  password: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', UserSchema);
