// AttendanceController.js
const Course = require('../models/Course');
const Student = require('../models/Student');

//*******************add render to the page  */

module.exports = {
   update:updateAttendance
  };
  

async function updateAttendance(req, res) {
  try {
  
    const students = req.body;

    const course = await Course.findById(req.params.id).populate('students');

    for (const student of students) {
      const studentObj = course.students.find((student) => student.id === student.id);
      studentObj.attendanceObject.push({
        date: new Date(),
        status: student.status,
      });
      await studentObj.save();
    }

    await course.save();
    res.json(course.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};