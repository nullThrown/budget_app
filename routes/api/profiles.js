const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const validateProfile = require('../../middleware/validation/validateProfile');
const validate = require('../../middleware/validation/validate');
const {
  unauthenticated,
  invalid_data,
  invalid_credentials,
  server_error,
  email_already_exists,
  resource_created,
  resource_deleted,
} = require('../../util/responseTypes');

// ROUTE    GET api/profile/
// DESC     Get current user profile
// ACCESS   Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    console.log({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});

// ROUTE    POST api/profile/
// DESC     Create recurring payment
// ACCESS   Private
router.post('/recurring/create', verifyToken, async (req, res) => {
  try {
    let { amount, name, category, budget } = req.body;
    category = category.toLowerCase();
    const profile = await Profile.findOne({ user: req.user.id });
    let categoryMatch = false;

    profile.recurringPayments.forEach((rec) => {
      if (rec.category === category) {
        categoryMatch = true;
        rec.payments.push({ name, amount });
      }
    });

    if (!categoryMatch) {
      profile.recurringPayments.push({
        budget,
        category,
        payments: [{ amount, name }],
      });
      profile.categories.push(category.toLowerCase());
    }
    profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});

// ROUTE    POST api/profile/
// DESC     Update recurring payment
// ACCESS   Private

router.put('/recurring/edit', verifyToken, async (req, res) => {
  const { paymentId, name, amount, category } = req.body;
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $set: {
          'recurringPayments.$[i].payments.$[j].name': name,
          'recurringPayments.$[i].payments.$[j].amount': amount,
        },
      },
      {
        arrayFilters: [
          {
            'i.category': category,
          },
          {
            'j._id': paymentId,
          },
        ],

        returnOriginal: false,
        useFindAndModify: false,
      }
    );
    res.json(profile.recurringPayments);
  } catch (err) {
    console.error({ err: [err.message, err.stack] });
    res.status(500).json({ error: server_error });
  }
});
// ROUTE    POST api/profile/recurring/delete/:id
// DESC     Delete recurring payment
// ACCESS   Private
router.delete(
  '/recurring/delete/:id/:category',
  verifyToken,
  async (req, res) => {
    const { category, id } = req.params;
    try {
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $pull: { 'recurringPayments.$[i].payments': { _id: id } } },
        {
          arrayFilters: [{ 'i.category': category }],
          returnOriginal: false,
          useFindAndModify: false,
        }
      );
      res.json(updatedProfile.recurringPayments);
    } catch (err) {
      console.error({ err: [err.message, err.stack] });
      res.status(500).json({ error: server_error });
    }
  }
);

// ROUTE    POST api/profile/create
// DESC     Create or update new profile
// ACCESS   Private
router.post(
  '/create',
  verifyToken,
  validateProfile(),
  validate,
  async (req, res) => {
    const {
      paycheckAmount,
      salarySchedule,
      housingPayment,
      housingInsurance,
      vehicleLoan,
      vehicleInsurance,
      cellPlan,
      cellLoan,
      internetPlan,
      childcareTuition,
      childcareDaycare,
      healthInsurance,
      healthFitness,
      debtStudent,
      debtCredit,
      retirementIra,
      retirementBrokerage,
      retirement401k,
    } = req.body;

    const newProfile = {
      user: req.user.id,
      paycheckAmount,
      salarySchedule,
      recurringPayments: [
        {
          // housing expenses
          total: Number(housingPayment) + Number(housingInsurance),
          category: 'housing',
          payments: [
            {
              amount: housingPayment,
              name: 'mortgage/rent',
            },
            {
              amount: housingInsurance,
              name: 'insurance',
            },
          ],
        },
        {
          // vehicle expenses
          total: Number(vehicleLoan) + Number(vehicleInsurance),
          category: 'vehicle',
          payments: [
            {
              amount: vehicleLoan,
              name: 'loan',
            },
            {
              amount: vehicleInsurance,
              name: 'insurance',
            },
          ],
        },
        {
          // utility expenses
          total: Number(cellPlan) + Number(cellLoan) + Number(internetPlan),
          category: 'utilities',
          payments: [
            {
              amount: cellPlan,
              name: 'cell plan',
            },
            {
              amount: cellLoan,
              name: 'cell loan',
            },
            {
              amount: internetPlan,
              name: 'internet',
            },
          ],
        },
        {
          // childcare expenses
          total: Number(childcareTuition) + Number(childcareDaycare),
          category: 'childcare',
          payments: [
            {
              amount: childcareTuition,
              name: 'tuition',
            },
            {
              amount: childcareDaycare,
              name: 'daycare',
            },
          ],
        },
        {
          // health expenses
          total: Number(healthInsurance) + Number(healthFitness),
          category: 'health',
          payments: [
            {
              amount: healthInsurance,
              name: 'insurance',
            },
            {
              amount: healthFitness,
              name: 'fitness',
            },
          ],
        },
        {
          // debt payment expenses
          total: Number(debtStudent) + Number(debtCredit),
          category: 'debt',
          payments: [
            {
              amount: debtStudent,
              name: 'student',
            },
            {
              amount: debtCredit,
              name: 'credit',
            },
          ],
        },
        {
          // retirement expenses
          total:
            Number(retirement401k) +
            Number(retirementIra) +
            Number(retirementBrokerage),
          category: 'retirement',
          payments: [
            {
              amount: retirement401k,
              name: '401k',
            },
            {
              amount: retirementIra,
              name: 'ira',
            },
            {
              amount: retirementBrokerage,
              name: 'brokerage',
            },
          ],
        },
      ],
      categories: [
        'housing',
        'vehicle',
        'utilites',
        'childcare',
        'health',
        'debt',
        'retirement',
      ],
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { ...newProfile, updatedAt: Date.now() },
          {
            returnOriginal: false,
            useFindAndModify: false,
          }
        );
      } else {
        profile = new Profile(newProfile);
        await profile.save();
      }
      res.json(profile);
    } catch (err) {
      console.error({ err: [err.message, err.stack] });
      res.status(500).json({ error: server_error });
    }
  }
);

module.exports = router;
