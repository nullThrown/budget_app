const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');


// Account creation
router.get('/sign-up', usersController.getSignUp);

router.post('/sign-up', usersController.postSignUp); 

// Profile setup
// router.get('/profile-set-up', usersController.getProfileSetUp);

// router.post('/profile-set-up', usersController.postProfileSetUp);


module.exports = router;