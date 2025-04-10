
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nature-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-nature-400" />
              <span className="text-xl font-semibold text-white">Anandwan</span>
            </div>
            <p className="text-nature-300 max-w-xs">
              A self-sustaining community empowering leprosy patients and marginalized groups through rehabilitation, education, and sustainable living.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-nature-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-nature-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-nature-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-nature-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-nature-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-nature-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-nature-300 hover:text-white transition-colors">Volunteer</Link>
              </li>
              <li>
                <Link to="/donate" className="text-nature-300 hover:text-white transition-colors">Donate</Link>
              </li>
              <li>
                <Link to="/awareness" className="text-nature-300 hover:text-white transition-colors">Leprosy Awareness</Link>
              </li>
              <li>
                <Link to="/qr-generator" className="text-nature-300 hover:text-white transition-colors">QR Generator</Link>
              </li>
              <li>
                <Link to="/contact" className="text-nature-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-nature-100">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/volunteer" className="text-nature-300 hover:text-white transition-colors">Join as Volunteer</Link>
              </li>
              <li>
                <Link to="/donate" className="text-nature-300 hover:text-white transition-colors">Make a Donation</Link>
              </li>
              <li>
                <a href="#" className="text-nature-300 hover:text-white transition-colors">Organize a Visit</a>
              </li>
              <li>
                <a href="#" className="text-nature-300 hover:text-white transition-colors">Spread Awareness</a>
              </li>
              <li>
                <a href="#" className="text-nature-300 hover:text-white transition-colors">Partner with Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-nature-100">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-nature-400 mt-0.5" />
                <span className="text-nature-300">Anandwan, Warora, Maharashtra, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-nature-400" />
                <span className="text-nature-300">+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-nature-400" />
                <span className="text-nature-300">contact@anandwan.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-nature-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-nature-400 text-sm">© 2025 Anandwan. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span className="text-nature-400 text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-nature-400 text-sm">for a better world</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
