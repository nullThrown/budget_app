const requiredStr = { type: String, required: true };
const requiredNum = { type: Number, required: true };
const defaultedStr = { type: String, default: '' };
const defaultedNum = { type: Number, default: 0 };
const requiredBool = { type: Boolean, required: true };
const dateNow = { type: Date, default: Date.now };
module.exports = {
  requiredStr,
  requiredNum,
  defaultedStr,
  defaultedNum,
  requiredBool,
  dateNow,
};
