var homeworkModel = require('../models/homework');
const Student = require('../models/student');

const index = async (req, res) => {
	try {
		const homeworks = await homeworkModel.getAllHomeworks().lean();
        const students = await Student.find({});
		
		let totalGrade = homeworks.reduce((total, grade) => total + grade.gradeWaight, 0);
		const sum = homeworks.length;

		homeworks.total=(totalGrade/sum)*(100/10);
        
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
		const student = await Student.findById(req.params.id);
		homeworks.gradeWaight.push(req.body.explorerId);
		res.redirect(`/homeworks/${student._id}`);
		
	} catch (err) {
		console.error(err);
		res.redirect('/homeworks/new');
	}
};

const show = async (req, res) => {
	try {
		const homeworks = await homeworkModel.getAllHomeworks().lean();
		const students = await Student.find({});
		const student = await Student.findById(req.params.id);

		let totalGrade = homeworks.reduce((total, grade) => total + grade.gradeWaight, 0);
		const sum = homeworks.length;

		homeworks.total=(totalGrade/sum)*(100/10);
		res.render('homeworks/show',
		 {
		homeworks,student,students
		});
	} catch (err) {
		console.log(err)
	}
};

module.exports = {
	index,
	new: newhomework,
	create,
	show 
};
