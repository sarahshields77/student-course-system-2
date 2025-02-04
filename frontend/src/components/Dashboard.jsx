import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2>Welcome to Your Dashboard</h2>
      <p>You have successfully registered and logged in!</p>

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}

export default Dashboard;
