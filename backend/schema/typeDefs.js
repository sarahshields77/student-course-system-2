const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    id: ID!
    studentNumber: String!
    firstName: String!
    lastName: String!
    email: String!
    program: String
    favouriteTopic: String
    strongestSkill: String
    courses: [Course]!
  }

  type Course {
    id: ID!
    courseCode: String!
    courseName: String!
    section: String
    semester: String
    students: [Student]
  }

  type AuthPayload {
    token: String!
    student: Student
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
    courses: [Course]
    course(id: ID!): Course
    studentsByCourse(courseCode: String!): [Student]
    listStudentCourses: [Course]
    listAllCourses: [Course]
    listAllStudents: [Student]
  }

  type Mutation {
    registerStudent(
      studentNumber: String!,
      password: String!,
      firstName: String!,
      lastName: String!,
      email: String!,
      program: String,
      favouriteTopic: String,
      strongestSkill: String
    ): AuthPayload

    loginStudent(studentNumber: String!, password: String!): AuthPayload

    addCourseToStudent(courseCode: String!): Student
    dropCourseFromStudent(courseCode: String!): Student
    updateCourseSection(courseCode: String!, newSection: String!): Course
  }
`;

module.exports = typeDefs;
