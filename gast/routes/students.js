const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')

const studentsCtrl = require('../controllers/students');

router.get('/', ensureLoggedIn,studentsCtrl.index);

router.get('/new', ensureLoggedIn,studentsCtrl.new);

router.get('/grade', ensureLoggedIn,studentsCtrl.grade);


router.get('/grade', studentsCtrl.grade);


router.post('/',ensureLoggedIn, studentsCtrl.create);

router.get('/:id', ensureLoggedIn,studentsCtrl.show);

module.exports = router;