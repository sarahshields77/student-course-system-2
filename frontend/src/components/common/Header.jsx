import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/CCbanner.jpg";

function Header() {
    return (
        <header className="bg-custom text-white py-3">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <img src={logo} alt="Centennial Logo" className="me-3" style={{ height: "50px" }} />
                <h3 className="m-0">Student Course System</h3>
                <nav>
                    <Link className="text-white mx-3 text-decoration-none" to="/">Home</Link>
                    <Link className="text-white mx-3 text-decoration-none" to="/login">Login</Link>
                </nav>
            </div>
        </header>

    );
}

export default Header;