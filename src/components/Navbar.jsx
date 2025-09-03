import React, { useState } from 'react';
import logo from '../assets/Frame 3.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-[#171717] p-4 fixed w-full z-10 top-0'>
      <div className="container mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center space-x-2">
          <img src={logo} alt="My Portfolio Logo" className="h-8 w-auto" />
          <span className="text-white text-xl font-bold">Cian Combalicer</span>
        </a>

        {/* Hamburger menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Desktop menu links */}
        <ul className="hidden md:flex space-x-10">
          <li><a href="#home" className="text-gray-300 hover:text-white custom-inter">Home</a></li>
          <li><a href="#about" className="text-gray-300 hover:text-white custom-inter">About</a></li>
          <li><a href="#projects" className="text-gray-300 hover:text-white custom-inter">Projects</a></li>
          <li><a href="#contact" className="text-gray-300 hover:text-white custom-inter">Contact</a></li>
        </ul>
      </div>

      {/* Mobile menu links (visible when isOpen is true) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col items-center mt-4 space-y-4">
          <li><a href="#home" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white custom-inter block px-3 py-2">Home</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white custom-inter block px-3 py-2">About</a></li>
          <li><a href="#projects" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white custom-inter block px-3 py-2">Projects</a></li>
          <li><a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white custom-inter block px-3 py-2">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;