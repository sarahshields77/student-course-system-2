const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const resolvers = {
  Query: {
    students: async () => await Student.find().populate('courses'),
    student: async (_, { id }) => await Student.findById(id).populate('courses'),
    courses: async () => await Course.find().populate('students'),
    course: async (_, { id }) => await Course.findById(id).populate('students'),
  },

  Mutation: {
    registerStudent: async (_, args) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const student = new Student({ ...args, password: hashedPassword });
      await student.save();

      const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, student };
    },

    loginStudent: async (_, { studentNumber, password }) => {
      const student = await Student.findOne({ studentNumber });
      if (!student) throw new Error("Student not found");

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, student };
    },

    addCourseToStudent: async (_, { courseId }, context) => {
      const user = authMiddleware(context);
      const student = await Student.findById(user.id);
      const course = await Course.findById(courseId);

      if (!student || !course) throw new Error("Invalid student or course");

      student.courses.push(course.id);
      course.students.push(student.id);

      await student.save();
      await course.save();
      return student;
    },

    dropCourseFromStudent: async (_, { courseId }, context) => {
      const user = authMiddleware(context);
      const student = await Student.findById(user.id);
      const course = await Course.findById(courseId);

      if (!student || !course) throw new Error("Invalid student or course");

      student.courses = student.courses.filter(id => id.toString() !== courseId);
      course.students = course.students.filter(id => id.toString() !== student.id);

      await student.save();
      await course.save();
      return student;
    },
  }
};

module.exports = resolvers;
