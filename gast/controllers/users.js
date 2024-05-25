const User = require('../models/user');

const newUser = (req, res) => {
	res.render('students/new');
}

const index = async (req, res, next) => {
  try {
      const users = await user.find({});
      res.render('students/', {users});
      console.log(students)
  }
  catch (err) {
       next(err);
  }};

  const create = async(req, res) => {
    try {
      User.create(req.body)
      if (req.body.email) {
        req.body.email = req.body.email.trim();
        req.body.email = req.body.email.split(/\s*,\s*/);
      }
      const user = new User(req.body);
      if (user.name) {
        user.name = user.name.toUpperCase();
      }
          await user.save();
          console.log(user);
          res.redirect('/students');
        } catch (err) {
          console.error(err);
          res.redirect('/students/new');
        }
  }


  module.exports = {
    new: newUser,
    create,
    index,
    
  };