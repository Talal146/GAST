const express = require('express');
const router = express.Router();

const coursessCtrl = require('../controllers/courses');

router.get('/', coursessCtrl.index);
router.get('/new', coursessCtrl.new);
router.get('/:id', coursessCtrl.show);
router.post('/', coursessCtrl.create);
	
module.exports = router;
