const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const attendanceSchema = new Schema({
  date: { type: Date, default: Date.now
   }, 
  attended: { type: Boolean, required: true } 
});


const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  details: { type:Boolean},

  status: { 
    type: [attendanceSchema],
    required:true,
    default: [] 
  },
  attendanceCount: { type: Number, default: 0 }
  ,
  homeworks: [{ type: Schema.Types.ObjectId, ref: 'homeworks' }]
  }, 
  {
    timestamps: true
  });



  studentSchema.methods.updateAttendance = async function(attended) {
    this.status.push({ attended }); 
    this.attendanceCount = attended ? this.attendanceCount + 1 : this.attendanceCount; 
    await this.save(); 
  };
  
  
module.exports = mongoose.model('Student', studentSchema);