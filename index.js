const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware');

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('abccc123123'));
app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.render('index', {
    name: 'ABC',
  });
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
