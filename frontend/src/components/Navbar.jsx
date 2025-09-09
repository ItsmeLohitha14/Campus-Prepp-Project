import React, { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen className="text-purple-600" size={28} />
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            CampusPrep
          </span>
        </Link>


        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
          <Link to="/companies" className="hover:text-purple-600">Companies</Link>
          <Link to="/questions" className="hover:text-purple-600">Questions</Link>
          <Link to="/updates" className="hover:text-purple-600">Updates</Link>
          <Link to="/login" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">Log In</Link>
          <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Register</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-800" onClick={toggleMenu}>
          {navOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="md:hidden mt-3 bg-white shadow-md rounded-md py-4 px-6 flex flex-col items-start gap-4 text-gray-800 font-medium">
          <Link to="/companies" onClick={toggleMenu}>Companies</Link>
          <Link to="/questions" onClick={toggleMenu}>Questions</Link>
          <Link to="/updates" onClick={toggleMenu}>Updates</Link>
          <Link to="/login" onClick={toggleMenu}>Log In</Link>
          <Link to="/register" onClick={toggleMenu} className="bg-purple-600 text-white px-4 py-1 rounded">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
