import React from "react";
import { gql, useQuery } from "@apollo/client";

const LIST_ALL_STUDENTS = gql`
  query ListAllStudents {
    listAllStudents {
      studentNumber
      firstName
      lastName
      email
      program
      courses {
        courseCode
        courseName
      }
    }
  }
`;

const ListAllStudents = () => {
    const { loading, error, data } = useQuery(LIST_ALL_STUDENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error.message}</p>;

    return (
        <div className="container text-center mt-4">
            <h3>All Registered Students</h3>
            {data.listAllStudents.length > 0 ? (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Student Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Program</th>
                            <th>Courses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.listAllStudents.map((student, index) => (
                            <tr key={index}>
                                <td>{student.studentNumber}</td>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.program}</td>
                                <td>
                                    {student.courses.length > 0
                                        ? student.courses.map(course => course.courseCode).join(", ")
                                        : "No courses enrolled"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students registered yet.</p>
            )}
        </div>
    );
};

export default ListAllStudents;
