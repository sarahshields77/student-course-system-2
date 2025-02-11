import React from 'react';
import { Link } from 'react-router-dom';

function ListStudentsByCourse() {
  return (
    <div className="container text-center mt-5">
            <h2 className="mb-4">Welcome to the Student-Course Management System</h2>
            <p className="mb-4">Please login or register to continue:</p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <Link to="/register" className="btn btn-secondary">
                    Student Register
                </Link>
                <Link to="/login" className="btn btn-secondary">
                    Student Login
                </Link>            
            </div>
        </div>
  );
}

export default ListStudentsByCourse;