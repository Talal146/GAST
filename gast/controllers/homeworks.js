var homeworkModel = require('../models/homework');
const Student = require('../models/student');
const User = require('../models/user');

const index = async (req, res) => {
	try {
		const homeworks = await homeworkModel.getAllHomeworks().lean();
		console.log(homeworks);
		res.render('homeworks/index', {
			homeworks,
		});
	} catch {}
};

const newhomework = (req, res) => {
	res.render('homeworks/new');
}

const create = async(req, res) => {
    try {
	  homeworkModel.create(req.body)
      req.body.details = !!req.body.details;
  
      if (req.body.name) {
        req.body.name = req.body.name.trim();
        req.body.name = req.body.name.split(/\s*,\s*/);
      }
  
     await homeworkModel.save();
      console.log(student);         
	  res.redirect('/homeworks');
       } catch (err) {
      console.error(err);
	  res.redirect('/homeworks/new');
        }
  }

module.exports = {
	index,
	new: newhomework,
	create
};
