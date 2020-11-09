const express = require('express');
const profileSetUpController = require('../controllers/profileSetUpController');

const router = express.Router();


router.get('/profile-set-up', profileSetUpController.getProfileSetUp);

router.post('/profile-set-up', profileSetUpController.postProfileSetUp);

module.exports = router;