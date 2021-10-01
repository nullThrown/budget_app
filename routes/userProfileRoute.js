const express = require('express');
const router = express.Router();

const userProfileController = require('../controllers/userProfileController');

router.get('/home', userProfileController.getHome);

router.get('/yearly', userProfileController.getYearly);

router.post('/add-expenditure', userProfileController.postAddExpenditure );

module.exports = router;