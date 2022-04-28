const express = require('express')
const shortid = require('shortid')
const router = express.Router()
const controller = require('../controllers/user.controller')

router.get('/', controller.index)

router.get('/create', controller.create)

router.get('/search', controller.search)

router.post('/store', controller.store);

router.get('/:id', controller.detail)

module.exports = router