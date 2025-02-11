import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const UPDATE_COURSE_SECTION = gql`
    mutation UpdateCourseSection($courseCode: String!, $newSection: String!) {
        updateCourseSection(courseCode: $courseCode, newSection: $newSection) {
            courseCode
            courseName
            section
            semester
        }
    }
`;

const UpdateCourse = () => {
    const [courseCode, setCourseCode] = useState("");
    const [newSection, setNewSection] = useState("");
    const [message, setMessage] = useState(null);
    const [updateCourseSection, { loading, error }] = useMutation(UPDATE_COURSE_SECTION, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateCourseSection({ variables: { courseCode, newSection } });
            setMessage(`Course section updated successfully! New section: ${data.updateCourseSection.section}`);
            setCourseCode("");
            setNewSection("");
        } catch (err) {
            setMessage(`${err.message}`);
        }
    };

    return (
        <div className="container text-center mt-4">
            <h3>Update Course Section</h3>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Course Code</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Course Code (e.g. COMP308)"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">New Section</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter New Section (e.g. 403)"
                        value={newSection}
                        onChange={(e) => setNewSection(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-secondary" disabled={loading}>
                    {loading ? "Updating..." : "Update Section"}
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
            {error && <p className="text-danger">{error.message}</p>}
        </div>
    );
};

export default UpdateCourse;
