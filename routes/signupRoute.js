const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

// Account creation
router.get('/sign-up', signupController.getSignup);

router.post('/sign-up', signupController.postSignup); 

module.exports = router;