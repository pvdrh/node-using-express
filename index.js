const express = require('express')
const app = express()
const port = 3000
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.get('/', function(req, res) {
    res.render('index', {
        name: 'ABC'
    })
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})