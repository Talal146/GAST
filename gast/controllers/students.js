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
      const students = await Student.find({}).sort('name');
      res.render('students/index', {students});
      console.log(students)
  }
  catch (err) {
      next(err);
  }};

  const show = async(req, res) =>{
  const users = await User.find({})
  const students = await Student.find({}); 
  res.render('students/show', { title: 'Student details', students ,users});
  }

  
  const getStudents = async (req, res) => {
    try {
      const students = await Student.find().sort('name')
      res.render('students/attendance', { students }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving students!');
    }
  };

  const submitAttendance = async (req, res) => {
    try {
      const attendanceStatus = req.body;
      console.log(attendanceStatus);
      await Promise.all(
        Object.entries(attendanceStatus).map(async ([studentId, attendance]) => {
          const student = await Student.findById(studentId);
          await student.updateAttendance(attendance === 'true');
          student.save()

        })
    
      );  
  
    
    res.redirect("/students/attendance")
    } catch (error) {
      console.error(error);
    }
  }

async function editStudent(req, res) {
    const student = await Student.findById(req.params.id);
    const students = await Student.find({});
    res.render(`students/edit`, {student, students});
    }

async function updatedStudent (req, res) { 
    const { name, email, details } = req.body;
    await Student.findByIdAndUpdate(req.params.id,{ name, email, details })
    res.redirect('/students');
   };

async function deletedStudent (req, res) { 
    await Student.findByIdAndDelete(req.params.id)
    res.redirect('/students');
   };

module.exports = {
    new: newStudent,
    create,
    index,
    show,
    edit: editStudent,
    update: updatedStudent,
    delete: deletedStudent,  
    getStudents,
    submitAttendance
  };

  
