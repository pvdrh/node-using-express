const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });

const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.post('/store', upload.single('avatar'), validate.postCreate, controller.store);

router.get('/:id', controller.detail);

module.exports = router;
