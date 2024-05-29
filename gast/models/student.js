const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  details: { type:Boolean},

  attendanceObject: {
    date: { type: Date},
    status: {
      type:Boolean,
      enum: ['true', 'false'],
  }},
  homeworks: [{ type: Schema.Types.ObjectId, ref: 'homeworks' }]
  }, 
  {
    timestamps: true
  });

module.exports = mongoose.model('Student', studentSchema);