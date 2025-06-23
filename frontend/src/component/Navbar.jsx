import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCarSide, FaRobot } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", icon: <IoCarSport />, path: "/" },
    { label: "Add Car", icon: <FaCarSide />, path: "/add-car" },
    { label: "Chatbot", icon: <FaRobot />, path: "/chatbot" },
  ];

  return (
    <>
      <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
            <h1 className="text-xl font-bold">ChatCar Insight</h1>
          </Link>
          <div className="hidden md:flex gap-8 text-lg">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl md:hidden"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-black px-4 pb-4 flex flex-col gap-4 text-lg shadow-lg">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
