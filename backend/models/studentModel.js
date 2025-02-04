const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  program: String,
  favouriteTopic: String,
  strongestSkill: String, 
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model('Student', studentSchema);
