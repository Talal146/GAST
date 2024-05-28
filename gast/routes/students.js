const express = require('express');
const router = express.Router();

const studentsCtrl = require('../controllers/students');

router.get('/', studentsCtrl.index);
router.get('/new', studentsCtrl.new);
router.post('/', studentsCtrl.create);
router.get('/details', studentsCtrl.show);
router.get('/:id/edit', studentsCtrl.edit);
router.put('/:id', studentsCtrl.update);


module.exports = router;