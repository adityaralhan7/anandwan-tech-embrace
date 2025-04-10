
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center leaf-pattern">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-nature-900/90 to-nature-800/80 z-0"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Together, Let's Empower Anandwan with Technology
          </h1>
          
          <p className="text-lg md:text-xl text-nature-100 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join us in leveraging technology to support Anandwan's mission of rehabilitation, 
            community-building, and sustainable living for leprosy patients and marginalized groups.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild className="bg-nature-500 hover:bg-nature-600 text-white px-8 py-6 text-lg">
              <Link to="/volunteer">Volunteer With Us</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-6 text-lg">
              <Link to="/donate">Make a Donation</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </div>
  );
};

export default Hero;
