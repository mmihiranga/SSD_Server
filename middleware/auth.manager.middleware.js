const jwt = require('jsonwebtoken');
const roles = require('../utils/roles.util');

/**
 * use to authorize as manager
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} res
 */
const verifyManagerAuth = (req, res, next) => {
  console.log(req.headers.token);
  if (req.headers.token) {
    try {
      const token = req.headers.token;
      if (!token) return res.status(401).json({ message: 'Unauthorized' });

      const verified = jwt.verify(token, process.env.JWT_SECRET);

      console.log(verified);

      if (verified.role !== roles.MANAGER) return res.status(401).json({ message: 'Unauthorized' });

      req.body.user = verified.user;

      next();
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
};

module.exports = { verifyManagerAuth };
