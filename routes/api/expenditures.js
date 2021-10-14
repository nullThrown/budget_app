const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { verifyToken } = require('../../middleware/auth');
const validateExpenditure = require('../../middleware/validation/validateExpenditure');
const validate = require('../../middleware/validation/validate');
const { verify } = require('jsonwebtoken');
const { response } = require('express');

// ROUTE    POST api/profile/
// DESC     create new expenditure
// ACCESS   Private
router.post(
  '/expenditures',
  verifyToken,
  validateExpenditure(),
  validate,
  async (req, res) => {
    const { title, amount, necessity, category } = req.body;
    const expenditure = {
      title,
      amount,
      necessity,
      category,
    };
    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $push: { expenditures: expenditure } },
        { returnOriginal: false, useFindAndModify: false }
      );
      res.json(profile);
    } catch (err) {
      console.log({ err: [err.message, err.stack] });
      res.status(500).send('server error');
    }
  }
);
// ROUTE    GET api/profile/
// DESC     Get all expenditures
// ACCESS   Private
router.get('/expenditures', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.json(profile.expenditures);
  } catch (err) {
    console.log({ err: [err.message, err.stack] });
    res.status(500).send('server error');
  }
});

// ROUTE    GET api/profile/
// DESC     Get all expenditures by current month
// ACCESS   Private
router.get('/exp', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const monthlyExp = profile.expenditures.filter((exp) => {
      return (
        exp.date.getMonth() === new Date().getMonth() &&
        exp.date.getYear() === new Date().getYear()
      );
    });
    res.json(monthlyExp);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).send('server error');
  }
});
// ROUTE    GET api/profile/
// DESC     Get all expenditures by current year
// ACCESS   Private
router.get('/expenditures/year', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const yearlyExp = profile.expenditures.filter((exp) => {
      return exp.date.getYear() === new Date().getYear();
    });
    res.json(yearlyExp);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).send('server error');
  }
});

// ROUTE    DELETE api/profile/
// DESC     Delete a single expenditure
// ACCESS   Private
router.delete('/expenditures/:id', verifyToken, async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { expenditures: { _id: req.params.id } } },
      { returnOriginal: false, useFindAndModify: false }
    );
    res.json(updatedProfile);
  } catch (err) {
    console.log({ err: [err.message, err.stack] });
    res.status(500).send('server error');
  }
});
module.exports = router;

// const expenditures = await Profile.aggregate([
//   // { $match: { $month: { date: new Date().now } } },
//   { $match: { paycheck: 1700 } },
// ]);
// ROUTE    GET api/profile/
// DESC     Get all expenditures by current month
// ACCESS   Private
// let currentMonth = (await new Date().getMonth()) + 1;
// res.send(currentMonth);
// const aggr = await User.aggregate([{ $match: { name: 'weson' } }]);
// res.json(aggr);
//  get current month in int form
// use mongodb pipeline to filter out exp by current month int
// return exp list in JSON format
