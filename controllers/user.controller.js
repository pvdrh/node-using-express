const db = require('../db')
const shortid = require('shortid')

module.exports.index = function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.search = function(req, res) {
    var q = req.query.q;
    var matched = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matched
    })
}

module.exports.store = function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
}

module.exports.detail = function(req, res) {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    })
}

module.exports.create = function(req, res) {
    res.render('users/create')
}