const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')
const studentsCtrl = require('../controllers/students');





router.get('/details', studentsCtrl.show);
router.get('/:id/edit', studentsCtrl.edit);
router.post('/:id', studentsCtrl.update);
router.post('/:id/delete', studentsCtrl.delete);
router.get('/', studentsCtrl.index);
router.get('/new', studentsCtrl.new);
router.get('/attendance', studentsCtrl.getStudents);
router.post('/attendance', studentsCtrl.submitAttendance);
router.post('/', studentsCtrl.create);
router.get('/', ensureLoggedIn,studentsCtrl.index);
router.get('/new', ensureLoggedIn,studentsCtrl.new);
router.get('/attendance', studentsCtrl.getStudents);
router.post('/attendance', studentsCtrl.submitAttendance);
router.post('/',ensureLoggedIn, studentsCtrl.create);
router.get('/:id', ensureLoggedIn,studentsCtrl.show);



module.exports = router;