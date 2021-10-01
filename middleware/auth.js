const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(400).json({ msg: 'not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
  } catch (err) {
    return res.status(400).json({ msg: 'token is not valid' });
  }
  next();
};
