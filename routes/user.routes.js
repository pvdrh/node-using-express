const express = require('express')
const db = require('../db')
const shortid = require('shortid')
const router = express.Router()

router.get('/', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
})

router.get('/create', function(req, res) {
    res.render('users/create')
})

router.get('/search', function(req, res) {
    var q = req.query.q;
    var matched = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matched
    })
})

router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
});

router.get('/:id', function(req, res) {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    })
})


module.exports = router