const express = require('express');
const router = express.Router();
const studentsCtrl = require('../controllers/students');

router.get('/', studentsCtrl.getAll);
router.get('/new', studentsCtrl.new);
router.get('/:id', studentsCtrl.show);
router.post('/', studentsCtrl.create);




// // This router is mounted to a "starts with" path of '/'

// // GET /students/new (new functionality)
// router.get('/students/new', studentsCtrl.new);
// // POST /students (create functionality)
// router.post('/students', studentsCtrl.create);
// // POST /movies/:id/students (associate students with movies)
// router.post('/movies/:id/students', studentsCtrl.addToCast)

// module.exports = router;


// module.exports = router;