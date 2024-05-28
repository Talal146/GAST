const express = require('express')
const router = express.Router()

const coursesCtrl = require('../controllers/courses')

router.get('/', ensureLoggedIn,coursesCtrl.index)
// router.get('/new', coursesCtrl.new);
router.get('/:id', ensureLoggedIn,coursesCtrl.showpage)
// router.post('/', coursesCtrl.create);

module.exports = router
