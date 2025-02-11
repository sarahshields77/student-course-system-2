import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const LIST_STUDENT_COURSES = gql`
  query ListStudentCourses {
    listStudentCourses {
      courseCode
      courseName
      section
      semester
    }
  }
`;

const ListStudentCourses = () => {
    const { loading, error, data } = useQuery(LIST_STUDENT_COURSES, {
        fetchPolicy: "network-only", 
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Send token with request
            },
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error.message}</p>;

    return (
        <div className="container text-center mt-4">
            <h3>Your Enrolled Courses</h3>
            {data.listStudentCourses.length > 0 ? (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Section</th>
                            <th>Semester</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.listStudentCourses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.courseCode}</td>
                                <td>{course.courseName}</td>
                                <td>{course.section}</td>
                                <td>{course.semester}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No courses enrolled yet.</p>
            )}
        </div>
    );
};

export default ListStudentCourses;
