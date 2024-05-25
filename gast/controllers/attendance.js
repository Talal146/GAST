// // AttendanceController.js
// const Course = require('../models/Course');
// const Student = require('../models/Student');


// module.exports = {
//    update:updateAttendance
//   };
  

// async function updateAttendance(req, res) {
//   try {
//     const { courseId } = req.params;
//     const { students } = req.body;

//     const course = await Course.findById(courseId).populate('students');

//     for (const student of students) {
//       const studentObj = course.students.find((s) => s.id === student.id);
//       studentObj.attendanceObject.push({
//         date: new Date(),
//         status: student.status,
//       });
//       await studentObj.save();
//     }

//     await course.save();
//     res.json(course.students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };