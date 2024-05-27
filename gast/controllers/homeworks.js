var homeworkModel = require('../models/homework');
const Student = require('../models/student');
const User = require('../models/user');


const index = async (req, res) => {
	try {
		const homeworks = await homeworkModel.getAllHomeworks().lean();
		console.log(homeworks);
        const students = await Student.find({});
		
		let totalGrade = homeworks.reduce((total, grade) => total + grade.gradeWaight, 0);
        console.log(totalGrade,"totalGrade");
		homeworks.forEach(
		hw=>
 				hw.total=(totalGrade/hw.name.length)*(100/10),
		)
        
		res.render('homeworks/index', {
			homeworks,students
		});
	} catch {}
};

const newhomework = (req, res) => {
	res.render('homeworks/new');
}

const create = async (req, res) => {
	try {
		const newHomework = await homeworkModel.createHomework(req.body);
		console.log(newHomework);
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
