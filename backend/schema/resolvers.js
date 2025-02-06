const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
require('dotenv').config();

const resolvers = {
  Query: {
    students: async () => await Student.find().populate('courses'),
    student: async (_, { id }) => await Student.findById(id).populate('courses'),
    courses: async () => await Course.find().populate('students'),
    course: async (_, { id }) => await Course.findById(id).populate('students'),
    course: async (_, { id }) => await Course.findById(id).populate('students'),
    studentsByCourse: async (_, { courseId }) => {
      const course = await Course.findById(courseId).populate('students');
      if (!course) throw new Error("Course not found");
      return course.students;
    },
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

    addCourseToStudent: async (_, { courseId }, { req }) => {
       const token = req.headers.authorization?.split("Bearer ")[1];
       if (!token) throw new Error("Unauthorized: No token provided");
 
       try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const student = await Student.findById(decoded.id);
         const course = await Course.findById(courseId);
 
         if (!student || !course) throw new Error("Invalid student or course");
 
         student.courses.push(course.id);
         course.students.push(student.id);
 
         await student.save();
         await course.save();
         return student;
       } catch (error) {
         throw new Error("Unauthorized: Invalid token");
       }     
    },

    dropCourseFromStudent: async (_, { courseId }, { req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) throw new Error("Unauthorized: No token provided");

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findById(decoded.id);
        const course = await Course.findById(courseId);

        if (!student || !course) throw new Error("Invalid student or course");

        student.courses = student.courses.filter(id => id.toString() !== courseId);
        course.students = course.students.filter(id => id.toString() !== student.id);

        await student.save();
        await course.save();
        return student;
      } catch (error) {
        throw new Error("Unauthorized: Invalid token");
      }
    },

    updateCourseSection: async (_, { courseId, newSection }, { req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) throw new Error("Unauthorized: No token provided");

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findById(decoded.id);
        const course = await Course.findById(courseId);

        if (!student || !course) throw new Error("Invalid student or course");

        student.courses = student.courses.filter(id => id.toString() !== courseId);
        course.students = course.students.filter(id => id.toString() !== student.id);

        await student.save();
        await course.save();
        return student;
      } catch (error) {
        throw new Error("Unauthorized: Invalid token");
      }
    },
  },
};

module.exports = resolvers;
