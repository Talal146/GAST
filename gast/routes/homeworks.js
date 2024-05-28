const express = require('express');
const router = express.Router();
const homeworksCtrl = require('../controllers/homeworks');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/', ensureLoggedIn,homeworksCtrl.index);
router.get('/new',ensureLoggedIn, homeworksCtrl.new);
router.post('/', ensureLoggedIn,homeworksCtrl.create);
router.get('/:id',ensureLoggedIn,homeworksCtrl.show);

module.exports = router;
