import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_STUDENT = gql`
    mutation RegisterStudent($studentNumber: String!, $password: String!, $firstName: String!, $lastName: String!, $email: String!, $program: String, $favouriteTopic: String, $strongestSkill: String) {
        registerStudent(studentNumber: $studentNumber, password: $password, firstName: $firstName, lastName: $lastName, email: $email, program: $program, favouriteTopic: $favouriteTopic, strongestSkill: $strongestSkill) {
            token    
            student {
                id
                studentNumber
                firstName
                lastName
                email
                program
                favouriteTopic
                strongestSkill
            }
        }           
    }
`;

function RegisterForm() {
    const [formData, setFormData] = useState({
        studentNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        program: "",
        favouriteTopic: "",
        strongestSkill: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const [registerStudent, { loading }] = useMutation(REGISTER_STUDENT);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

         try {
      const { data } = await registerStudent({ variables: formData });

      if (data.registerStudent.token) {
        localStorage.setItem("token", data.registerStudent.token); 
        setSuccess("Registration successful! Redirecting...");
        setFormData({
          studentNumber: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          program: "",
          favouriteTopic: "",
          strongestSkill: "",
        });

        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setError(error.message);
    }
    };


    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">Student Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" name="studentNumber" placeholder="Student Number" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="text" name="firstName" placeholder="First Name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="text" name="lastName" placeholder="Last Name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="text" name="program" placeholder="Program" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input type="text" name="favouriteTopic" placeholder="Favourite Topic" className="form-control" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <input type="text" name="strongestSkill" placeholder="Strongest Skill" className="form-control" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-secondary" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            {success && <p className="text-success mt-3">{success}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
        </div>
    );
}

export default RegisterForm;