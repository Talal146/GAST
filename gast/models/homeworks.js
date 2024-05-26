const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeWorkSchema = new Schema(
	{
		name: { type: String, required: true },
		deliverTime: { type: Date, required: true },
		gradeWaight: { type: Number, min: 0, max: 10 },
		description: { type: Text, required: true },
	},
	{
		timestamps: true,
	}
);
const homeworkModel = mongoose.model('homeworks', homeWorkSchema);

const createHomework = (homeWorkData) => {
	return homeworkModel.create(homeWorkData);
};
const getHomeworks = () => {
	return homeworkModel.find();
};
const getHomeworkById = (id) => {
	return homeworkModel.findById(id);
};
const updateHomework = (id, homeWorkData) => {
	return homeworkModel.findByIdAndUpdate(id, homeWorkData);
};
const deleteHomework = (homeWorkData) => {
	return homeworkModel.findByIdAndDelete(homeWorkData);
};
module.exports = {
	createHomework,
	getHomeworks,
	getHomeworkById,
	updateHomework,
	deleteHomework,
};
