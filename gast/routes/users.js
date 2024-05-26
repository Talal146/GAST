const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

// router.get('/', usersCtrl.getAll);
router.get('/new', usersCtrl.new);
// router.get('/:id', usersCtrl.show);
router.post('/', usersCtrl.create);


module.exports = router;
