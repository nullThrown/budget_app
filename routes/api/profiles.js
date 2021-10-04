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

    // housing expenses
    housingExp: {
      total: Number(housingPayment) + Number(housingInsurance),
      housingPayment: {
        amount: housingPayment,
      },
      housingInsurance: {
        amount: housingInsurance,
      },
    },

    // vehicle expenses
    vehicleExp: {
      total: Number(vehicleLoan) + Number(vehicleInsurance),
      vehicleLoan: {
        amount: vehicleLoan,
      },
      vehicleInsurance: {
        amount: vehicleInsurance,
      },
    },

    // utility expenses
    utilityExp: {
      total: Number(cellPlan) + Number(cellLoan) + Number(internetPlan),
      cellPlan: {
        amount: cellPlan,
      },
      cellLoan: {
        amount: cellLoan,
      },
      internetPlan: {
        amount: internetPlan,
      },
    },

    // childcare expenses
    childcareExp: {
      total: Number(childcareTuition) + Number(childcareDaycare),
      childcareTuition: {
        amount: childcareTuition,
      },
      childcareDaycare: {
        amount: childcareDaycare,
      },
    },

    // health expenses
    healthExp: {
      total: Number(healthInsurance),

      healthInsurance: {
        amount: healthInsurance,
      },
    },

    // debt
    debt: {
      total: Number(debtStudent) + Number(debtCredit),
      debtStudent: {
        amount: debtStudent,
      },
      debtCredit: {
        amount: debtCredit,
      },
    },

    // retirement
    retirement: {
      total:
        Number(retirement401k) +
        Number(retirementIra) +
        Number(retirementBrokerage),
      retirement401k: {
        amount: retirement401k,
      },
      retirementIra: {
        amount: retirementIra,
      },
      retirementBrokerage: {
        amount: retirementBrokerage,
      },
    },
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
