const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const validateProfile = require('../../middleware/validation/validateProfile');
const validate = require('../../middleware/validation/validate');

// ROUTE    POST api/profile/
// DESC     Get current user profile
// ACCESS   Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    console.log(profile.monthlyTakeHome);
    res.json({ profile });
  } catch (err) {
    res.status(500).send('server error');
    console.log({ err: [err.message, err.stack] });
  }
});

// ROUTE    POST api/profile/
// DESC     Create or update new profile
// ACCESS   Private
router.post('/', verifyToken, validateProfile(), validate, async (req, res) => {
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
    res.status(500).send('server error');
  }
});

module.exports = router;
