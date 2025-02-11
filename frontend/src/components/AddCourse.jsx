import React from 'react';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_COURSE_TO_STUDENT = gql`
    mutation AddCourseToStudent($courseCode: String!) {
        addCourseToStudent(courseCode: $courseCode) {
            id
            courses {
                courseCode
                courseName
                section
                semester
            }
        }
    }
`;

const AddCourse = () => {
    const [courseCode, setCourseCode] = useState("");
    const [message, setMessage] = useState(null);
    const [addCourseToStudent, { loading, error }] = useMutation(ADD_COURSE_TO_STUDENT);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addCourseToStudent({ variables: { courseCode } });
            setMessage(`Course added successfully! You are now enrolled in ${data.addCourseToStudent.courses.length} courses.`);
            setCourseCode("");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="container text-center mt-4">
        <h3>Add a Course</h3>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Course ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary" disabled={loading}>
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
        {error && <p className="text-danger">{error.message}</p>}
      </div>
    );
};

export default AddCourse;

