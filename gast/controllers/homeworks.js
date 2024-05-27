var homeworkModel = require('../models/homework');

const index = async (req, res) => {
	try {
		const homeworks = await homeworkModel.getAllHomeworks().lean();
		console.log(homeworks);
		res.render('homeworks/index', {
			homeworks,
		});
	} catch {}
};
module.exports = {
	index,
};
