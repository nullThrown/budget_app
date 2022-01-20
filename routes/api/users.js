const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { server_error } = require('../../util/responseTypes');
// ROUTE    GET api/user/me
// DESC     Get current user
// ACCESS   Private
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: server_error });
  }
});

// ROUTE    DELETE api/user/me
// DESC     Delete current user and assoc. profile
// ACCESS   Private
router.delete('/me', verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    await Profile.findOneAndDelete({ user: req.user.id });
    res.json({ success: 'Your account has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: server_error });
  }
});

module.exports = router;
