const express = require('express')
const app = express()
const port = 3000
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
var cookieParser = require('cookie-parser')
const authMiddleware = require('./middlewares/auth.middleware')

app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('abccc123123'))

app.set('view engine', 'pug')

app.get('/', function(req, res) {
    res.render('index', {
        name: 'ABC'
    })
})

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})