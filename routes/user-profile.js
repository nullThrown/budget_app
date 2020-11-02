const express = require('express');
const router = express.Router();

const userProfile = require('../controllers/user-profile');

router.get('/home', userProfile.getHome);

// router.get('/yearly', (res, req) => {
//   res.render('yearly');
// });

module.exports = router;