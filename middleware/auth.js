const jwt = require('jsonwebtoken');
const { unauthenticated } = require('../util/errorTypes');
// validation method that accesses token from request headers
// const verifyToken = (req, res, next) => {
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res.status(400).json({ error: unauthenticated });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWTSECRET);
//     req.user = decoded.user;
//   } catch (err) {
//     return res.status(400).json({ error: unauthenticated });
//   }
//   next();
// };

// validation method that accesses token from request cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.x_auth_token;
  if (!token) {
    return res.status(401).json({ error: unauthenticated });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
  } catch (err) {
    return res.status(403).json({ error: unauthenticated });
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
