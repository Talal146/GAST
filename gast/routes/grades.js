const express = require('express');
const router = express.Router();

const gradesCtrl = require('../controllers/grades');

router.post('/grades', gradesCtrl.update);

module.exports = router;