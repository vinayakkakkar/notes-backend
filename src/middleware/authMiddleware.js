const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    console.log('Decoded User:', user);

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
