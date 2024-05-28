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

const newhomework = async (req, res) => {
	try {
	const students = await Student.find({});
	res.render(`homeworks/new`, {students});
	} catch (err) {
        console.error(err);
        res.redirect('/homeworks');
    }
}

const create = async (req, res) => {
	try {
		const newHomework = await homeworkModel.createHomework(req.body);
		student.homework = 
		res.redirect(`/homeworks`);
		
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

 const editSkill = (req, res) => {
	const skill = Skill.getOne(req.params.id);
	res.render('skills/edit', {
		skill
	});
  };
  
  const update = (req, res) => {
	const skillId = req.params.id;
	const updatedSkill = req.body.Skill;
	Skill.updateOne(skillId, updatedSkill);
	res.redirect('/skills');
  };

module.exports = {
	index,
	new: newhomework,
	create,
	show 
};
