const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { requiredStr } = require('./fieldTypes');

const UserSchema = new Schema(
  {
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    firstName: { ...requiredStr, maxlength: 32 },
    lastName: { ...requiredStr, maxlength: 32 },
    email: { ...requiredStr, maxlength: 32 },
    password: { ...requiredStr, maxlength: 32 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
