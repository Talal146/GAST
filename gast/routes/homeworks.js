const express = require('express');
const router = express.Router();

const homeworksCtrl = require('../controllers/homeworks');

router.get('/', homeworksCtrl.index);

router.get('/new', homeworksCtrl.new);

router.post('/', homeworksCtrl.create);

module.exports = router;
