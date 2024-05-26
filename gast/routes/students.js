const express = require('express');
const router = express.Router();

const studentsCtrl = require('../controllers/students');

router.get('/', studentsCtrl.index);

router.get('/new', studentsCtrl.new);

router.get('/grade', studentsCtrl.grade);

router.post('/', studentsCtrl.create);

router.get('/:id', studentsCtrl.show);

module.exports = router;