const express = require('express');
const router = express.Router();

const studentsCtrl = require('../controllers/students');

router.get('/', studentsCtrl.index);

router.get('/new', studentsCtrl.new);

router.post('/', studentsCtrl.create);

module.exports = router;