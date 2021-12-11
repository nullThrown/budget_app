const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(400).json({ msg: 'not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTHSECRET);
    req.user = decoded.user;
  } catch (err) {
    return res.status(400).json({ msg: 'token is not valid' });
  }
  next();
};

//invalidate a token
const backDate = (req, res, next) => {
  const token = req.header('x-auth-token');

  try {
    token = jwt.sign(
      { iat: Math.floor(Date.now() / 1000) - 30 },
      process.env.JWTSECRET
    );
  } catch (err) {
    return res.status(400).json({ msg: 'why is this still running' });
  }
  next();
};

module.exports = {
  verifyToken,
  backDate,
};
