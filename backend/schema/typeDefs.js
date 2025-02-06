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
    courses: [Course]
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
    studentsByCourse(courseId: ID!): [Student]
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

    addCourseToStudent(courseId: ID!): Student
    dropCourseFromStudent(courseId: ID!): Student
    updateCourseSection(courseId: ID!, section: String!): Course
  }
`;

module.exports = typeDefs;
