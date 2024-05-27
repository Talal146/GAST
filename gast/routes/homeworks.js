const express = require('express');
const router = express.Router();

const homeworksCtrl = require('../controllers/homeworks');

router.get('/', homeworksCtrl.index);

module.exports = router;
