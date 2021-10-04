const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const { verifyToken } = require('../../middleware/auth');
const validateExpenditure = require('../../middleware/validation/validateExpenditure');
const validate = require('../../middleware/validation/validate');
const { verify } = require('jsonwebtoken');

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
