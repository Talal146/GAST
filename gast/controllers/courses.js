const Course = require('../models/course');
const Student = require('../models/student');
const User = require('../models/user');

module.exports = {
  index,
  show
};

//display all courses in the home page
async function index(req, res) {
  const courses = await Course.find({});
  res.render('courses/index', { title: 'All Courses', courses });
}


async function show(req, res) {
  
    const course = await Course.findById(req.params.id).populate('name');
    const students = await Student.find({});
    const users = await User.find({});
    const courseUsers = course.users;
    const courseUsersName = courseUsers.map((courseUser) => courseUser.name);
    const availableUsers = users.filter((courseUser)=> {
      console.log(typeof courseUser._id)
      if(!courseUsersName.includes(courseUser.name)) {
        return courseUser;  
      }
    })

    const courseStudents = course.students;
    const courseNames = courseStudents.map((courseStu) => courseStu.name);
    const availableStudents = students.filter((courseStu)=> {
      console.log(typeof courseStu._id)
      if(!courseNames.includes(courseStu.name)) {
        return courseStu;
      }
    })
    res.render(`couses/${course._id}`, { title:` '${course.name}'`, course, availableStudents,availableUsers });
  }



  