const { body } = require('express-validator');

const validateProfile = () => {
  return [
    body('paycheckAmount', 'must be a number').trim().isNumeric().escape(),
    body('salarySchedule').trim().escape(),
    body('housingPayment', 'must be a number').trim().isNumeric().escape(),
    body('housingInsurance', 'must be a number').trim().isNumeric().escape(),
    body('vehicleLoan', 'must be a number').trim().isNumeric().escape(),
    body('vehicleInsurance', 'must be a number').trim().isNumeric().escape(),
    body('cellPlan', 'must be a number').trim().isNumeric().escape(),
    body('cellLoan', 'must be a number').trim().isNumeric().escape(),
    body('internetPlan', 'must be a number').trim().isNumeric().escape(),
    body('childcareTuition', 'must be a number').trim().isNumeric().escape(),
    body('childcareDaycare', 'must be a number').trim().isNumeric().escape(),
    body('healthInsurance', 'must be a number').trim().isNumeric().escape(),
    body('debtStudent', 'must be a number').trim().isNumeric().escape(),
    body('debtCredit', 'must be a number').trim().isNumeric().escape(),
    body('retirementIra', 'must be a number').trim().isNumeric().escape(),
    body('retirementBrokerage', 'must be a number').trim().isNumeric().escape(),
    body('retirement401k', 'must be a number').trim().isNumeric().escape(),
  ];
};

module.exports = validateProfile;
