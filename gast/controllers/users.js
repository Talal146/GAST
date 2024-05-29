const User = require('../models/user');

const newUser = (req, res) => {
	res.render('users/new');
}

const create = async(req, res) => {
    try {
      User.create(req.body)
      req.body.details = !!req.body.details;
  
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
          res.redirect('/users');
        } catch (err) {
          console.error(err);
          res.redirect('/users/new');
        }
  }

const index = async (req, res, next) => {
  try {
      const users = await User.find({});
      res.render('users/', {users});
      console.log(users)
  }
  catch (err) {
       next(err);
  }};

async function show(req, res) {
    res.render('users/show', { title: 'User details', User});
  }

  module.exports = {
    new: newUser,
    create,
    index,
    show    
  };