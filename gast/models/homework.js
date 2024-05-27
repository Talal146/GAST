const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeWorkSchema = new Schema(
	{
		name: { type: String, required: true },
		deliverTime: { type: Date, required: true },
		gradeWaight: { type: Number, min: 0, max: 10 },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);
const HomeworkModel = mongoose.model('homeworks', homeWorkSchema);

const createHomework = (homeWorkData) => {
	return new HomeworkModel(homeWorkData).save();
};
const getAllHomeworks = () => {
	return HomeworkModel.find();
};
const getHomeworkById = (id) => {
	return HomeworkModel.findById(id);
};
const updateHomework = (id, homeWorkData) => {
	return HomeworkModel.findByIdAndUpdate(id, homeWorkData);
};
const deleteHomework = (homeWorkData) => {
	return HomeworkModel.findByIdAndDelete(homeWorkData);
};
module.exports = {
	createHomework,
	getAllHomeworks,
	getHomeworkById,
	updateHomework,
	deleteHomework,
};
