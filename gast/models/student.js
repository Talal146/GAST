const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  homework: { type: [Number] ,min:0,max:10},
  project: { type: [Number],min:0,max:20 },
  attendanceObject: {
    date: { type: Date, required: true },
    status: {
      type:Boolean,
      enum: ['true', 'false'],
      required: true
    }
  }}, 
  {
    timestamps: true
  });

module.exports = mongoose.model('Student', studentSchema);