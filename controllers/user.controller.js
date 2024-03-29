const shortid = require('shortid');
const db = require('../db');
const User = require('../models/user.model');

// eslint-disable-next-line func-names
module.exports.index = async function (req, res) {
  const users = await User.find();
  res.render('users/index', {
    users,
  });
  // const page = parseInt(req.query.page, 10) || 1;
  // const perPage = 5;
  // const start = (page - 1) * perPage;
  // const end = page * perPage;
  // let size = db.get('users').size().value();
  // size = Math.ceil(size / start);
  // let prevPage = 0;
  // let nextPage = 0;
  // if (page - 1 === 0) {
  //   prevPage = 1;
  // } else {
  //   prevPage = page - 1;
  // }
  // if (nextPage + 1 === size) {
  //   nextPage = page;
  // } else {
  //   nextPage = page + 1;
  // }

  // // const drop = (page - 1) * perPage;
  // res.render('users/index', {
  //   users: db.get('users')
  //     .value().slice(start, end),
  //   prevPage,
  //   nextPage,
  //   page,
  //   // users: db.get('users')
  //   //   .drop(drop).take(perPage).value(),
  // });
};

// eslint-disable-next-line func-names
module.exports.search = function (req, res) {
  const { q } = req.query;
  const matched = db.get('users')
    .value()
    .filter((user) => user.name.toLowerCase()
      .indexOf(q.toLowerCase()) !== -1);
  res.render('users/index', {
    users: matched,
  });
};

// eslint-disable-next-line func-names
module.exports.store = function (req, res) {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.slice(7, req.file.path.length).replace('\\', '/');
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('/users');
};

// eslint-disable-next-line func-names
module.exports.detail = function (req, res) {
  const { id } = req.params;
  const user = db.get('users')
    .find({ id })
    .value();
  res.render('users/view', {
    user,
  });
};

// eslint-disable-next-line func-names
module.exports.create = function (req, res) {
  res.render('users/create', {
    csrfToken: res.csrfToken,
  });
};
