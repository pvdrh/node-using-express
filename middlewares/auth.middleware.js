const db = require('../db');

// eslint-disable-next-line func-names
module.exports.requireAuth = function (req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  const user = db.get('users')
    .find({ id: req.signedCookies.userId })
    .value();
  if (!user) {
    res.redirect('/auth/login');
    return;
  }
  res.locals.user = user;

  next();
};
