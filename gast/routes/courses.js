const express = require('express');
const router = express.Router();

const coursesCtrl = require('../controllers/courses');

//show all courses in the home page + show all students and users

router.get('/', coursesCtrl.index);
// router.get('/new', coursesCtrl.new);
router.get('/:id', coursesCtrl.show);
// router.post('/', coursesCtrl.create);
	
module.exports = router;
