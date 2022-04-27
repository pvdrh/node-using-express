const express = require('express')
const app = express()
const port = 3000

const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: [] }).write()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.get('/', function(req, res) {
    res.render('index', {
        name: 'ABC'
    })
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
})

app.get('/users/create', function(req, res) {
    res.render('users/create')
})

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matched = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matched
    })
})

app.post('/users/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
});

app.get('/users/:id', function(req, res) {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})