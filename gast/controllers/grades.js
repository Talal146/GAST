// GradeController.js
const Course = require('../models/course');
const Student = require('../models/student');

async function updateGrades(req, res){
  try {
 
    const students  = req.body;

    const course = await Course.findById(req.params.id).populate('students');
    
    for (const student of students) {
      const studentObj = course.students.find((stu) => stu.id === student.id);
      studentObj.homework.push(student.homework);
      studentObj.project.push(student.project);
      await studentObj.save();
    }

    await course.save();
  } catch (error) {
    console.log(error);
    res.redirect(`/courses/${course._id}`);
  }
};


module.exports = {
    update:updateGrades
  };