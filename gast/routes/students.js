const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')
const studentsCtrl = require('../controllers/students');

router.get('/new', ensureLoggedIn,studentsCtrl.new);
router.post('/',ensureLoggedIn, studentsCtrl.create);
router.get('/', ensureLoggedIn,studentsCtrl.index);
router.get('/details', ensureLoggedIn,studentsCtrl.show);
router.get('/attendance', ensureLoggedIn,studentsCtrl.getStudents);
router.post('/attendance', ensureLoggedIn,studentsCtrl.submitAttendance);
router.get('/:id/edit', ensureLoggedIn,studentsCtrl.edit);
router.post('/:id', ensureLoggedIn,studentsCtrl.update);
router.post('/:id/delete', ensureLoggedIn,studentsCtrl.delete);


module.exports = router;