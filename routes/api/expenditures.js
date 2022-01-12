const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { verifyToken } = require('../../middleware/auth');
const validateExpenditure = require('../../middleware/validation/validateExpenditure');
const validate = require('../../middleware/validation/validate');
const { verify } = require('jsonwebtoken');
const { response } = require('express');
const Expenditures = require('../../models/Expenditures');
const { nextTick } = require('async');

// ROUTE    POST api/exp/create-new
// DESC     create new expenditure
// ACCESS   Private
router.post(
  '/create-new',
  verifyToken,
  validateExpenditure(),
  validate,
  async (req, res) => {
    const { title, amount, necessity, category } = req.body;

    const expense = {
      title,
      amount,
      necessity,
      category,
    };

    try {
      let expenditures = await Expenditures.findOne({ user: req.user.id });
      if (expenditures) {
        expenditures = await Expenditures.findOneAndUpdate(
          { user: req.user.id },
          { $push: { expenses: expense } },
          { returnOriginal: false, useFindAndModify: false }
        );
      } else {
        expenditures = new Expenditures({
          user: req.user.id,
          expenses: expense,
        });
        await expenditures.save();
      }
      res.json(expenditures);
    } catch (err) {
      console.log({ err: [err.message, err.stack] });
      res.status(500).send('server error');
    }
  }
);

// ROUTE    GET api/exp/get-all
// DESC     Get all expenditures
// ACCESS   Private
router.get('/get-all', verifyToken, async (req, res) => {
  try {
    const expenditures = await Expenditures.findOne({ user: req.user.id });
    res.json(expenditures.expenses);
  } catch (err) {
    console.log({ err: [err.message, err.stack] });
    res.status(500).send('server error');
  }
});

// ROUTE    GET api/exp/current-month
// DESC     Get all expenditures by month and year param
// ACCESS   Private
router.get('/month/:year/:month', verifyToken, async (req, res) => {
  try {
    const { year, month } = req.params;
    const expenditures = await Expenditures.findOne({ user: req.user.id });

    const monthlyExpenses = expenditures.expenses.filter((exp) => {
      return (
        exp.date.getMonth() === Number(month) &&
        exp.date.getFullYear() === Number(year)
      );
    });

    res.json(monthlyExpenses);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).send('server error');
  }
});
// ROUTE    GET api/exp/current-year
// DESC     Get all expenditures by year param
// ACCESS   Private
router.get('/year/:year', verifyToken, async (req, res) => {
  try {
    const expenditures = await Expenditures.findOne({ user: req.user.id });

    const yearlyExpenses = expenditures.expenses.filter((exp) => {
      return exp.date.getFullYear() === Number(req.params.year);
    });

    res.json(yearlyExpenses);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).send('server error');
  }
});

// ROUTE    DELETE api/exp/delete/:id
// DESC     Delete a single expenditure
// ACCESS   Private
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const updatedExp = await Expenditures.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { expenses: { _id: req.params.id } } },
      { returnOriginal: false, useFindAndModify: false }
    );
    res.json(updatedExp);
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
