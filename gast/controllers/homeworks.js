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
	
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
};

const newhomework = async (req, res) => {
	try {
	const homeworks = await homeworkModel.getAllHomeworks().lean().sort('name');
	const students = await Student.find({});
	const student = await Student.findById(req.params.id);
	res.render(`homeworks/new`, {students,homeworks,student});
	} catch (err) {
        console.error(err);

    }
}

const create = async (req, res) => {
	try {
		const { description, deliverTime, name, student,gradeWaight } = req.body;
				const newHomework = await homeworkModel.createHomework({
					description,
					deliverTime,
					name,
					gradeWaight,
				});
		const studentId = student;
		const studentObj = await Student.findById(studentId)
		const newHomeworkId = newHomework._id;
		console.log('Id of homework')
		studentObj.homeworks.push(newHomeworkId);

		await studentObj.save();
		res.redirect(`/homeworks/${studentObj._id}`);
	} catch (err) {
		console.error(err);
	}
};

const show = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).populate('homeworks');
		const homeworks = student.homeworks;

		let totalGrade = homeworks.reduce((total, grade) => total + grade.gradeWaight, 0);
		const sum = homeworks.length;

		homeworks.total=(totalGrade/sum)*(100/10);

		res.render(`homeworks/show`, {
			homeworks,
			student,
			totalGrade,
		});
	} catch (err) {
		console.log(err)
	}
};

module.exports = {
	index,
    new: newhomework,
    create,
    show,
};
