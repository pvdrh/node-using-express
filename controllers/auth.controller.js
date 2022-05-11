const db = require('../db')
const shortid = require('shortid')
const md5 = require('md5')

module.exports.login = function(req, res) {
    res.render('auth/login')
}

module.exports.postLogin = function(req, res) {
    let email = req.body.email
    let password = md5(req.body.password)
    let user = db.get('users').find({ email: email }).value()

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist!'
            ],
            values: req.body
        })
        return
    }

    if (user.password !== password) {
        res.render('auth/login', {
            errors: [
                'Wrong password!'
            ],
            values: req.body
        })
        return
    }

    res.cookie('userId', user.id, {
        signed: true,
    });
    res.redirect('/users');
}