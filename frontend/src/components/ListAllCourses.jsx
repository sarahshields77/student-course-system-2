import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_COURSES = gql`
  query ListAllCourses {
    listAllCourses {
      courseCode
      courseName
      section
      semester
    }
  }
`;

const ListAllCourses = () => {
    const { loading, error, data } = useQuery(GET_ALL_COURSES);

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container text-center mt-4">
            <h3>All Available Courses</h3>
            <ul className="list-group mt-3">
                {data.listAllCourses.map((course) => (
                    <li key={course.courseCode} className="list-group-item">
                        <strong>{course.courseCode}:</strong> {course.courseName} - {course.section} ({course.semester})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListAllCourses;
