import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_STUDENTS_BY_COURSE = gql`
  query StudentsByCourse($courseCode: String!) {
    studentsByCourse(courseCode: $courseCode) {
      id
      studentNumber
      firstName
      lastName
    }
  }
`;

const ListStudentsByCourse = () => {
    const [courseCode, setCourseCode] = useState("");
    const [getStudents, { loading, error, data }] = useLazyQuery(GET_STUDENTS_BY_COURSE);

    const handleSearch = () => {
        if (!courseCode) return;
        getStudents({ variables: { courseCode } });
    };

    return (
        <div className="container text-center mt-4">
            <h3>Find Students Enrolled in a Course</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Course Code (e.g., COMP308)"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                />
                <button className="btn btn-secondary mt-2" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error.message}</p>}

            {data?.studentsByCourse?.length > 0 ? (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Student Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.studentsByCourse.map((student) => (
                            <tr key={student.id}>
                                <td>{student.studentNumber}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                data && <p>No students found for this course.</p>
            )}
        </div>
    );
};

export default ListStudentsByCourse;