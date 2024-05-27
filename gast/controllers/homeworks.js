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

const create = async (req, res) => {
	try {
		// Create a new homework using the data from the request body
		const newHomework = await homeworkModel.createHomework(req.body);
		console.log(newHomework);
		// Redirect to the index page to display all homeworks
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
