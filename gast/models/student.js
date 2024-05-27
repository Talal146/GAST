const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  date: { type: Date, default: Date.now }, // Date of attendance
  attended: { type: Boolean, required: true } // Indicates attendance status (true/false)
});

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  details: { type:Boolean},
  homework: { type: [Number] },
  project: { type: [Number] },
  status: { 
    type: [attendanceSchema],
    required: true,
    default: [] 
  },
  attendanceCount: { type: Number, default: 0 }
  }, 
  {
    timestamps: true
  });

  // Helper method to update attendance status (optional)
studentSchema.methods.updateAttendance = async function(attended) {
  this.status.push({ attended }); // Add attendance record
  this.attendanceCount = attended ? this.attendanceCount + 1 : this.attendanceCount; // Update count
  await this.save(); // Save changes to the database
};


module.exports = mongoose.model('Student', studentSchema);