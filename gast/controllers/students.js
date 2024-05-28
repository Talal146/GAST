const student = require('../models/student');
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
  //       const grades = req.body.grades;
    
  //       // Iterate over the grades object to update student documents
  //       for (const studentId in grades) {
  //         const student = await Student.findById(studentId);
  //         if (!student) {
  //           // Handle case where student not found
  //           console.log(`Student with ID ${studentId} not found.`);
  //           continue;
  //         }
    
  //         // Update student's homework grades
  //         if (grades[studentId].homework) {
  //           student.homework = grades[studentId].homework;
  //         }
    
  //         // Update student's project grades
  //         if (grades[studentId].project) {
  //           student.project = grades[studentId].project;
  //         }
    
  //         console.log(grades)
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





  // const updateGrades = async (req, res) => {
  //     try {
  //       const grades = req.body.grades;
    
  //       // Iterate over the grades object to update student documents
  //       for (const studentId in grades) {
  //         const student = await Student.findById(studentId);
  //         if (!student) {
  //           // Handle case where student not found
  //           console.log(`Student with ID ${studentId} not found.`);
  //           continue;
  //         }
    
  //         // Update student's homework grades
  //         if (grades[studentId].homework) {
  //           student.homework = grades[studentId].homework;
  //         }
    
  //         // Update student's project grades
  //         if (grades[studentId].project) {
  //           student.project = grades[studentId].project;
  //         }
    
  //         console.log(grades)
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

  const getStudents = async (req, res) => {
    try {
      const students = await Student.find();
      res.render('students/grade', { students }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving students!');
    }
  };

  const submitGrades = async (req, res) => {
    try {
      const grades = req.body;
      console.log('grades', grades);
      
      const ids = Object.keys(grades);
      let totalGrade = 0;
      
      ids.forEach(
        async id => {
        let gradeArray = [];
        const gradeValue = grades[id].map(grade => parseInt(grade))
      
        let totalForId = 0;
        gradeArray.forEach(grade => {
          if (!isNaN(grade)) {
            totalForId += grade;
          } else {
            console.log(`Invalid grade: ${grade}`);
          }
        });
        totalGrade += totalForId;
        console.log('homework: ',gradeArray);
        console.log(`total for ID ${id}: ${totalForId}`);
        console.log(`total: ${totalGrade}`);
        console.log();
        console.log(`ID: ${id}`);
        console.log(`Homework:`,gradeValue);
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Error submitting grades!');
    }
  };

  const getStudents2 = async (req, res) => {
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
    grade,
    create,
    index,
    show ,
    getStudents,
    submitGrades ,
    getStudents2,
    submitAttendance,
    
  }