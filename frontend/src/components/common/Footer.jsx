import React from "react";

function Footer() {
    return (
        <footer className="bg-custom text-white text-center py-3 mt-4">
           <div className="container-fluid">
                <p>&copy; {new Date().getFullYear()} Sarah Shields 301264350 COMP 308 Assignment 2.</p>
            </div>
        </footer>
    );
}

export default Footer;