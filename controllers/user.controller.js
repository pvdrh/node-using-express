const shortid = require('shortid');
const db = require('../db');

module.exports.index = function (req, res) {
  res.render('users/index', {
    users: db.get('users')
      .value(),
  });
};

module.exports.search = function (req, res) {
  const q = req.query.q;
  const matched = db.get('users')
    .value()
    .filter((user) => user.name.toLowerCase()
      .indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', {
    users: matched,
  });
};

module.exports.store = function (req, res) {
  req.body.id = shortid.generate();
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('/users');
};

module.exports.detail = function (req, res) {
  const { id } = req.params;
  const user = db.get('users')
    .find({ id })
    .value();
  res.render('users/view', {
    user,
  });
};

module.exports.create = function (req, res) {
  res.render('users/create');
};
