const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;
const csurf = require('csurf');
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.render('index', {
    name: 'ABC',
  });
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use(function (req, res, next) {
  res.csrfToken = req.csrfToken();   
  next(); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
