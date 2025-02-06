import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCourse from "./AddCourse";
import UpdateCourse from "./UpdateCourse";
import DropCourse from "./DropCourse";
import ListStudentCourses from "./ListStudentCourses";
import ListAllStudents from "./ListAllStudents";
import ListAllCourses from "./ListAllCourses";
import ListStudentsByCourse from "./ListStudentsByCourse";

function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState(""); 

  const logout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className="container text-center mt-5">
      <h2>Welcome to Your Dashboard</h2>
      <p>You have successfully registered and logged in!</p>

      {/* Buttons to Switch Views */}
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        <button className="btn btn-secondary m-2" onClick={() => setView("addCourse")}>
          Add a Course
        </button>
        <button className="btn btn-secondary m-2" onClick={() => setView("updateCourse")}>
          Update a Course
        </button>
        <button className="btn btn-secondary m-2" onClick={() => setView("dropCourse")}>
          Drop a Course
        </button>
        <button className="btn btn-secondary m-2" onClick={() => setView("listStudentCourses")}>
          List Your Courses
        </button>
        <button className="btn btn-secondary m-2" onClick={() => setView("listAllStudents")}>
          List All Students
        </button>
        <button className="btn btn-secondary m-2" onClick={() => setView("listAllCourses")}>
          List All Courses
        </button>
        <button className="btn btn-secondary m-2" onClick={() => setView("listStudentsByCourse")}>
          List Students by Course
        </button>
        <button className="btn btn-danger m-2" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Show Component Based on Selected View */}
      <div className="mt-4">
        {view === "addCourse" && <AddCourse />}
        {view === "updateCourse" && <UpdateCourse />}
        {view === "dropCourse" && <DropCourse />}
        {view === "listStudentCourses" && <ListStudentCourses />}
        {view === "listAllStudents" && <ListAllStudents />}
        {view === "listAllCourses" && <ListAllCourses />}
        {view === "listStudentsByCourse" && <ListStudentsByCourse />}
      </div>

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}

export default Dashboard;
