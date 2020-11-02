const express = require('express');

const router = express.Router();


router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;