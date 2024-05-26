const Student = require('../models/student');

const newStudent = (req, res) => {
	res.render('students/new');
}

const grade = (req, res) => {
	res.render('students/grade');
}

const create = async(req, res) => {
    try {
      Student.create(req.body)
      req.body.details = !!req.body.details;
  
      if (req.body.email) {
        req.body.email = req.body.email.trim();
        req.body.email = req.body.email.split(/\s*,\s*/);
      }
  
      const student = new Student(req.body);
  
      if (student.name) {
        student.name = student.name.toUpperCase();
      }
          await student.save();
          console.log(student);
          res.redirect('/students');
        } catch (err) {
          console.error(err);
          res.redirect('/students/new');
        }
  }

const index = async (req, res, next) => {
  try {
      const students = await Student.find({});
      res.render('students/', {students});
      console.log(students)
  }
  catch (err) {
       next(err);
  }};

async function show(req, res) {
    res.render('students/show', { title: 'Planet details', Student});
  }

  module.exports = {
    new: newStudent,
    grade,
    create,
    index,
    show    
  };
