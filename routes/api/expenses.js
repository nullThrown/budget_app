const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const validateExpense = require('../../middleware/validation/validateExpense');
const validate = require('../../middleware/validation/validate');
const Expense = require('../../models/Expense');
const Profile = require('../../models/Profile');
const {
  unauthenticated,
  invalid_data,
  server_error,
  resource_deleted,
  resource_not_found,
} = require('../../util/responseTypes');

// ROUTE    POST api/exp/create-new
// DESC     create new expenditure
// ACCESS   Private
router.post(
  '/create',
  verifyToken,
  validateExpense(),
  validate,
  async (req, res) => {
    let { title, amount, description, necessity, category } = req.body;
    category = category.toLowerCase();
    const newExpense = {
      title,
      amount,
      description,
      necessity,
      category,
    };

    try {
      let expense = await Expense.findOne({ user: req.user.id });
      if (expense) {
        expense = await Expense.findOneAndUpdate(
          { user: req.user.id },
          { $push: { data: newExpense } },
          { returnOriginal: false, useFindAndModify: false }
        );
      } else {
        expense = new Expense({
          user: req.user.id,
          data: newExpense,
        });
        await expense.save();
      }

      const profile = await Profile.findOne({ user: req.user.id });
      const categoryExists = profile.categories.some((cat) => cat === category);

      if (!categoryExists) {
        profile.categories.push(category);
      }
      await profile.save();

      res.json([expense.data[expense.data.length - 1], profile.categories]);
    } catch (err) {
      console.log({ err: [err.message, err.stack] });
      res.status(500).json({ error: server_error });
    }
  }
);

// ROUTE    GET api/exp/get-all
// DESC     Get all //.data ACCESS   Private
router.get('/get-all', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findOne({ user: req.user.id });
    res.json(expense.data);
  } catch (err) {
    console.log({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});

// ROUTE    GET api/exp/current-month
// DESC     Get all expenses by month and year param
// ACCESS   Private
router.get('/month/:year/:month', verifyToken, async (req, res) => {
  try {
    const { year, month } = req.params;
    const expense = await Expense.findOne({ user: req.user.id });
    console.log(expense);
    const monthlyExpense = expense.data.filter((exp) => {
      return (
        exp.date.getMonth() === Number(month) &&
        exp.date.getFullYear() === Number(year)
      );
    });

    res.json(monthlyExpense);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});
// ROUTE    GET api/exp/current-year
// DESC     Get all expenses by year param
// ACCESS   Private
router.get('/year/:year', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findOne({ user: req.user.id });
    const yearlyExpense = Expense.data.filter((exp) => {
      return exp.date.getFullYear() === Number(req.params.year);
    });

    res.json(yearlyExpense);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});

// ROUTE    EDIT api/exp/edit/:id
// DESC     EDIT a single expenditure
// ACCESS   Private
router.put('/edit', verifyToken, async (req, res) => {
  const { title, amount, description, necessity, category, _id, date } =
    req.body;

  const EditedExpense = {
    title,
    amount,
    description,
    necessity,
    category,
    _id,
    date,
  };
  try {
    const expense = await Expense.findOneAndUpdate(
      { user: req.user.id, 'data._id': _id },
      {
        $set: {
          'data.$': EditedExpense,
        },
      },
      {
        returnOriginal: false,
        useFindAndModify: false,
      }
    );
    res.json(EditedExpense);
  } catch (err) {
    console.log({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});

// ROUTE    DELETE api/exp/delete/:id
// DESC     Delete a single expenditure
// ACCESS   Private
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findOne({ user: req.user.id });

    const expenseFound = expense.data.some((exp) => {
      return exp._id.toString() === req.params.id;
    });
    if (expenseFound) {
      const updatedExp = await Expense.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { data: { _id: req.params.id } } },
        { returnOriginal: false, useFindAndModify: false }
      );
      res.json({ success: resource_deleted });
    } else {
      res.status(404).json({ error: resource_not_found });
    }
  } catch (err) {
    console.log({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});
module.exports = router;

// AGGREGRATE PIPELINE ATTEMPT
// DESC: should apply a complex match sequence up find requests. Useful for querying by month/year

// const expenses = await Profile.aggregate([
//   // { $match: { $month: { date: new Date().now } } },
//   { $match: { paycheck: 1700 } },
// ]);
// ROUTE    GET api/profile/
// DESC     Get all expenses by current month
// ACCESS   Private
// let currentMonth = (await new Date().getMonth()) + 1;
// res.send(currentMonth);
// const aggr = await User.aggregate([{ $match: { name: 'weson' } }]);
// res.json(aggr);
//  get current month in int form
// use mongodb pipeline to filter out exp by current month int
// return exp list in JSON format
