const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')

app.get('/', function(req, res) {
    res.render('index', {
        name: 'ABC'
    })
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: [
            { id: 1, name: 'Duy' },
            { id: 2, name: 'Lan' },
            { id: 2, name: 'Tuan' }
        ]
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})