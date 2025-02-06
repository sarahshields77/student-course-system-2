import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN_STUDENT = gql`
  mutation LoginStudent($studentNumber: String!, $password: String!) {
    loginStudent(studentNumber: $studentNumber, password: $password) {
      token
      student {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

function LoginForm() {
  const [formData, setFormData] = useState({ studentNumber: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [loginStudent] = useMutation(LOGIN_STUDENT);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginStudent({ variables: formData });
      if (data.loginStudent.token) {
        localStorage.setItem("token", data.loginStudent.token);
        navigate("/dashboard"); // ✅ Redirect to Dashboard after login
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Student Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="studentNumber" className="form-label">
                        Student Number
                    </label>
                      <input
                          type="text"
                          id="studentNumber"
                          name="studentNumber"
                          className="form-control"
                          value={formData.studentNumber}
                          onChange={handleChange}
                          required
                      />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                          Password
                      </label>
                      <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          value={formData.password}
                          onChange={handleChange}
                          required
                      />
                  </div>
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
                  {success && <div className="alert alert-success mt-3">{success}</div>}
                  <div className="text-center">
                      <button type="submit" className="btn btn-secondary w-50">
                          Login
                      </button>
                  </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
