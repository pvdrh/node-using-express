const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')

var users = [
    { id: 1, name: 'Duy' },
    { id: 2, name: 'Lan' },
    { id: 3, name: 'Tuan' },
    { id: 4, name: 'Quang' },
    { id: 5, name: 'Lam' },
    { id: 6, name: 'Phong' },
];

app.get('/', function(req, res) {
    res.render('index', {
        name: 'ABC'
    })
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    })
})

app.get('/users/create', function(req, res) {
    res.render('users/create', {})
})

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matched = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matched
    })
})

app.post('/users/create', function(req, res) {
    console.log(req.body)
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})