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
    let errors = [];
    if (!req.body.name) {
        errors.push('Name is required.')
    }
    if (!req.body.phone) {
        errors.push('Phone is required.')
    }
    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        })
        return;
    }
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