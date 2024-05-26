const Course = require('../models/course');
const User = require('../models/user');


//*******************fix the render to the page  */

async function newUser(req, res) {
  const users = await User.find({}).sort('name');
  res.render('adduser/new', { title: 'Add Instructor', users });
}

async function create(req, res) {
  try {
    await User.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/adduser/new');
}

const addToCourse = async(req, res) => {
  try {
  
    const course = await Course.findById(req.params.id);
    course.user.push(req.body.studentId);
    await course.save()
    res.redirect(`/courses/${course._id}`);
  } catch(error) {
    console.log(error);
    res.redirect(`/courses/${course._id}`);
  } 
}

module.exports = {
  new: newUser,
  create,
  addToCourse
};
