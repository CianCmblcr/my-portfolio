import React from 'react';
import logo from '../assets/Frame 3.png';

const Navbar = () => {
  return (
    <nav className='bg-[#171717] p-4 flex flex-col'>
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
        <img src={logo} alt="My Portfolio Logo" className="h-8 w-auto" />
        <span className="text-white text-xl font-bold">Cian Combalicer</span>
        </a>
        <ul className="flex space-x-10">
          <li>
            <a href="#home" className="text-gray-300 hover:text-white custom-inter">Home</a>
          </li>
          <li>
            <a href="#about" className="text-gray-300 hover:text-white custom-inter">About</a>
          </li>
          <li>
            <a href="#projects" className="text-gray-300 hover:text-white custom-inter">Projects</a>
          </li>
          <li>
            <a href="#contact" className="text-gray-300 hover:text-white custom-inter">Contact</a>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Navbar;