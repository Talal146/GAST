const student = require('../models/student');
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

  const show = async(req, res) =>{
  const users = await User.find({});
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
      const updatedStudents = await Promise.all(
        Object.entries(attendanceStatus).map(async ([studentId, attendance]) => {
          const student = await Student.findById(studentId);
          if (!student) return false; 
          await student.updateAttendance(attendance === 'true');
          return student;
        })
      );    
    
    res.render("students/attendance", { students: updatedStudents });
    } catch (error) {
      console.error(error);
    }
  }
  
   module.exports = {
    new: newStudent,
    create,
    index,
    show ,
    getStudents,
    submitAttendance
    
  }