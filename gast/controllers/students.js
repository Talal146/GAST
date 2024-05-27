const Student = require('../models/student');
const User = require('../models/user');

const newStudent = (req, res) => {
	res.render('students/new');
}

const grade =async (req, res) => {
  const students = await Student.find({}).sort();
	res.render('students/grade',{students});
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

  // const updateGrades = async (req, res) => {
  //     try {
  //       const studentsGrades = req.body.grades;
    
  //       // Iterate over the grades object to update student documents
  //       for (const studentId in studentsGrades) {
  //         const student = await Student.findById(studentId);
  //         if (!student) {
  //           // Handle case where student not found
  //           console.log(`Student with ID ${studentId} not found.`);
  //           continue;
  //         }
    
  //         // Update student's homework grades
  //         if (studentsGrades[studentId].homework) {
  //           student.homework = studentsGrades[studentId].homework;
  //         }
    
  //         // Update student's project grades
  //         if (studentsGrades[studentId].project) {
  //           student.project = studentsGrades[studentId].project;
  //         }
    
  //         console.log(studentsGrades)
  //         // Save the updated student document
  //         await student.save();
  //       }
    
  //       // Redirect or send response indicating successful update
  //       res.redirect('/students'); // Replace '/students' with the appropriate URL
  //     } catch (error) {
  //       // Handle any errors that occurred during the update process
  //       console.error('Error updating student grades:', error);
  //       // Redirect or send an error response
  //       res.status(500).json({ error: 'An error occurred while updating student grades.' });
  //     }
  //   };


  exports.getStudents = async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving students!');
    }
  };
  
  const submitGrades = async (req, res) => {
    const grades = req.body.grades;
  
    try {
      for (const studentId in grades) {
        const studentGrades = grades[studentId];
        const update = {
          $set: {
            homework: studentGrades.homework,
            project: studentGrades.project
          }
        };
  
        await Student.findOneAndUpdate({ _id: studentId }, update);
      }
  
      res.send('Grades submitted successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error submitting grades!');
    }
  };
  
  module.exports = {
    new: newStudent,
    grade,
    create,
    index,
    show ,
    submitGrades
    // updateGrades   
  };