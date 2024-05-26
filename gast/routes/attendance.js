const express = require('express');
const router = express.Router();

const attendanceCtrl = require('../controllers/attendance');

router.put('/attendance', attendanceCtrl.update);



module.exports = router;