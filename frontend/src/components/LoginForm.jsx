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
    <div className="container text-center mt-5">
      <h2 className="mb-4">Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="studentNumber" placeholder="Student Number" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-secondary">Login</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}

export default LoginForm;
