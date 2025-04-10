
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-nature-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-nature-600" />
            <span className="text-xl font-semibold text-nature-900">Anandwan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900 transition-colors">
              Home
            </Link>
            <Link to="/volunteer" className="px-3 py-2 rounded-md text-sm font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900 transition-colors">
              Volunteer
            </Link>
            <Link to="/donate" className="px-3 py-2 rounded-md text-sm font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900 transition-colors">
              Donate
            </Link>
            <Link to="/awareness" className="px-3 py-2 rounded-md text-sm font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900 transition-colors">
              Awareness
            </Link>
            <Link to="/qr-generator" className="px-3 py-2 rounded-md text-sm font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900 transition-colors">
              QR Tools
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Join Us Button */}
          <div className="hidden md:block">
            <Button className="bg-nature-600 hover:bg-nature-700 text-white">
              Join Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-nature-700 hover:text-nature-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/volunteer"
              className="block px-3 py-2 rounded-md text-base font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900"
              onClick={toggleMenu}
            >
              Volunteer
            </Link>
            <Link
              to="/donate"
              className="block px-3 py-2 rounded-md text-base font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900"
              onClick={toggleMenu}
            >
              Donate
            </Link>
            <Link
              to="/awareness"
              className="block px-3 py-2 rounded-md text-base font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900"
              onClick={toggleMenu}
            >
              Awareness
            </Link>
            <Link
              to="/qr-generator"
              className="block px-3 py-2 rounded-md text-base font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900"
              onClick={toggleMenu}
            >
              QR Tools
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-nature-700 hover:bg-nature-50 hover:text-nature-900"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button className="w-full mt-2 bg-nature-600 hover:bg-nature-700 text-white">
              Join Us
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
