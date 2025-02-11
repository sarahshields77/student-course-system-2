import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const DROP_COURSE_FROM_STUDENT = gql`
  mutation DropCourseFromStudent($courseCode: String!) {
    dropCourseFromStudent(courseCode: $courseCode) {
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

const DropCourse = () => {
    const [courseCode, setCourseCode] = useState("");
    const [message, setMessage] = useState(null);
    const [dropCourseFromStudent, { loading, error }] = useMutation(DROP_COURSE_FROM_STUDENT, {
      update(cache, { data: { dropCourseFromStudent } }) {
        cache.modify({
          fields: {
            listStudentCourses(existingCourses = []) {
              return existingCourses.filter(course => 
                dropCourseFromStudent.courses.some(c => c.id !== course.id)
              );
            }
          }
        });
      }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await dropCourseFromStudent({ variables: { courseCode } });
            setMessage(`Course dropped successfully! You are now enrolled in ${data.dropCourseFromStudent.courses.length} courses.`);
            setCourseCode("");
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="container text-center mt-4">
        <h3>Drop a Course</h3>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Course Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? "Dropping..." : "Drop Course"}
          </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
        {error && <p className="text-danger">{error.message}</p>}
      </div>
    );
};

export default DropCourse;
