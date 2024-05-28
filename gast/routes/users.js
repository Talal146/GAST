const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/new', ensureLoggedIn,usersCtrl.new);
router.post('/', ensureLoggedIn,usersCtrl.create);
router.get('/', ensureLoggedIn,usersCtrl.index);

module.exports = router;

