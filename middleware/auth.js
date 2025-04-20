const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  if (req.path === '/auth/google' || req.path === '/auth/google/callback') {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.sendStatus(401);
      }
      req.user = user;
      req.isAuthenticated = () => true;
      return next();
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  });
};

module.exports = authenticateToken;
