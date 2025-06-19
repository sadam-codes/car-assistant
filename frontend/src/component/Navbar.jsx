import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/add-car">Add Car</Link>
      <Link to="/chatbot">Chatbot</Link>
    </nav>
  );
};

export default Navbar;
