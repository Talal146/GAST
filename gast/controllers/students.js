const Student = require('../models/student');
const User = require('../models/user');

const newStudent = (req, res) => {
	res.render('students/new');
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
      res.render('students/index', {students});
      console.log(students)
  }
  catch (err) {
       next(err);
  }};

async function show(req, res) {
  console.log("grade")
  const users = await User.find({});
  const students = await Student.find({});
  res.render('students/show', { title: 'Student details', students ,users});
  }

async function editStudent(req, res) {
    const student = await Student.findById(req.params.id);
    const students = await Student.find({});
    res.render(`students/edit`, {student, students});
    }

async function updatedStudent(req, res) {
      try {
        const student = await Student.findById(req.params.id);
        const { name, email, details } = req.body;
          
          // Find the student by ID and update the details
          await Student.findByIdAndUpdate(id, { name, email, details });
  
          // Redirect to the student list page or any other desired page
          res.redirect('/students');
      }
      catch (err) {
        next(err);
   }};

module.exports = {
    new: newStudent,
    create,
    index,
    show,
    edit: editStudent,
    update: updatedStudent  
  };