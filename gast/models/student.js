const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  details: { type:Boolean, required: true },
  
  homework: { type: [Number] },
  project: { type: [Number] },
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