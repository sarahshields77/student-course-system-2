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
    
    studentsByCourse: async (_, { courseCode }) => {
      const course = await Course.findOne({ courseCode }).populate('students');
      if (!course) throw new Error("Course not found");
      return course.students;
    },

    listStudentCourses: async (_, __, context) => {
      console.log("🔍 Received Token:", context.req.headers.authorization);
  
      if (!context.req.headers.authorization) {
          throw new Error("Unauthorized: No token provided");
      }
  
      const token = context.req.headers.authorization.split("Bearer ")[1];
      if (!token) throw new Error("Unauthorized: Invalid token format");
  
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log("🔍 Decoded User:", user);
  
      const student = await Student.findById(user.id).populate({
        path: "courses",
        model: "Course",
      });
      if (!student) throw new Error("Student not found");
  
      console.log("Student Found:", student);
      console.log("Student's Courses:", student.courses);
  
      return student.courses;
    },

    listAllCourses: async () => {
      return await Course.find().populate("students");
    },

    listAllStudents: async () => {
      console.log("Fetching all students...");
      return await Student.find().populate("courses");
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

    addCourseToStudent: async (_, { courseCode }, context) => {
      console.log("🔍 Checking Context:", context.req.headers.authorization); // Debugging
  
      if (!context.req.headers.authorization) {
          throw new Error("Unauthorized: No token provided");
      }
  
      // Extract token and verify user
      const token = context.req.headers.authorization.split("Bearer ")[1];
      if (!token) throw new Error("Unauthorized: Invalid token format");
  
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const student = await Student.findById(user.id).populate("courses");
      if (!student) throw new Error("Unauthorized: User not found");
  
      const course = await Course.findOne({ courseCode });
      if (!course) throw new Error("Course not found");
  
      console.log("Found course:", course); // Debugging log
  
      // ✅ Check if student is already enrolled
      if (student.courses.some(c => c.courseCode === courseCode)) {
          throw new Error("You are already enrolled in this course.");
      }
  
      // ✅ Check if course already contains student
      if (course.students.some(s => s.toString() === student.id.toString())) {
          throw new Error("Student is already enrolled in this course.");
      }
  
      student.courses.push(course.id);
      course.students.push(student.id);
  
      await student.save();
      await course.save();
  
      return await student.populate("courses"); // ✅ Ensure courses are properly returned
    },

    dropCourseFromStudent: async (_, { courseCode }, context) => {
      console.log("🔍 Checking Context:", context.req.headers.authorization); // Debugging

      if (!context.req.headers.authorization) {
          throw new Error("Unauthorized: No token provided");
      }

      // Extract token and verify user
      const token = context.req.headers.authorization.split("Bearer ")[1];
      if (!token) throw new Error("Unauthorized: Invalid token format");

      const user = jwt.verify(token, process.env.JWT_SECRET);
      const student = await Student.findById(user.id);
      if (!student) throw new Error("Unauthorized: User not found");

      const course = await Course.findOne({ courseCode });
      if (!course) throw new Error("Course not found");

      // Remove student from course and vice versa
      student.courses = student.courses.filter(id => id.toString() !== course.id.toString());
      course.students = course.students.filter(id => id.toString() !== student.id.toString());

      await student.save();
      await course.save();
      const updatedStudent = await Student.findById(user.id).populate("courses");
      return updatedStudent;
    },


    updateCourseSection: async (_, { courseCode, newSection }, context) => {
      console.log(`🔍 Updating Section for ${courseCode} to ${newSection}`);
  
      if (!context.req.headers.authorization) {
          throw new Error("Unauthorized: No token provided");
      }
  
      const token = context.req.headers.authorization.split("Bearer ")[1];
      if (!token) throw new Error("Unauthorized: Invalid token format");
  
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const student = await Student.findById(user.id);
      if (!student) throw new Error("Unauthorized: User not found");
  
      // Find the course by courseCode
      const course = await Course.findOne({ courseCode });
      if (!course) throw new Error("Course not found");
  
      // Update the section
      course.section = newSection;
      await course.save();
  
      console.log(`✅ Section updated to ${newSection}`);
  
      return course;
    },
  
  },
};

module.exports = resolvers;
