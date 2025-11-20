import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Frame 3.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (section) => {
    if (window.location.pathname !== "/") {
      // Navigate back to homepage FIRST
      navigate("/");

      // Give React Router a tiny delay to mount App.jsx
      setTimeout(() => {
        const target = document.getElementById(section);
        target?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      // Already on homepage → scroll instantly
      const target = document.getElementById(section);
      target?.scrollIntoView({ behavior: "smooth" });
    }

    setIsOpen(false); // close mobile menu
  };

  return (
    <nav className="bg-[#16171B] p-4 fixed w-full z-50 top-0">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <button
          onClick={() => handleScroll("home")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img src={logo} className="h-8 w-auto" />
          <span className="text-white text-xl font-bold">Cian Combalicer</span>
        </button>

        {/* Mobile Menu */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-10 text-gray-300 text-lg">
          <li><button className="hover:text-white" onClick={() => handleScroll("home")}>Home</button></li>
          <li><button className="hover:text-white" onClick={() => handleScroll("about")}>About</button></li>
          <li><button className="hover:text-white" onClick={() => handleScroll("projects")}>Projects</button></li>
          <li><button className="hover:text-white" onClick={() => handleScroll("contact")}>Contact</button></li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col items-center space-y-4 text-lg text-gray-300">
          <li><button onClick={() => handleScroll("home")} className="hover:text-white">Home</button></li>
          <li><button onClick={() => handleScroll("about")} className="hover:text-white">About</button></li>
          <li><button onClick={() => handleScroll("projects")} className="hover:text-white">Projects</button></li>
          <li><button onClick={() => handleScroll("contact")} className="hover:text-white">Contact</button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
