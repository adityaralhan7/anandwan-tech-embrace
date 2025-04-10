
import React from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Users, GraduationCap, TreePine, HandHeart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* About Section */}
      <section id="about-section" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nature-900 mb-4">Our Vision</h2>
            <p className="text-lg text-nature-700 max-w-3xl mx-auto">
              Anandwan is a community founded on the principles of self-reliance, dignity, and sustainable living.
              We provide rehabilitation, education, and opportunities for those affected by leprosy and other marginalized groups.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="nature-card p-8 flex flex-col items-center text-center">
              <div className="bg-nature-100 p-4 rounded-full mb-6">
                <HandHeart className="h-10 w-10 text-nature-600" />
              </div>
              <h3 className="text-xl font-semibold text-nature-800 mb-3">Rehabilitation</h3>
              <p className="text-nature-600">
                Providing comprehensive care, treatment, and rehabilitation services for leprosy patients and people with disabilities.
              </p>
            </div>
            
            <div className="nature-card p-8 flex flex-col items-center text-center">
              <div className="bg-nature-100 p-4 rounded-full mb-6">
                <GraduationCap className="h-10 w-10 text-nature-600" />
              </div>
              <h3 className="text-xl font-semibold text-nature-800 mb-3">Education</h3>
              <p className="text-nature-600">
                Empowering through education and vocational training, helping individuals build sustainable livelihoods.
              </p>
            </div>
            
            <div className="nature-card p-8 flex flex-col items-center text-center">
              <div className="bg-nature-100 p-4 rounded-full mb-6">
                <TreePine className="h-10 w-10 text-nature-600" />
              </div>
              <h3 className="text-xl font-semibold text-nature-800 mb-3">Sustainable Living</h3>
              <p className="text-nature-600">
                Creating eco-friendly, self-sustaining communities that honor nature while providing for human needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Get Involved Section */}
      <section className="py-20 px-4 bg-nature-50 leaf-pattern">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-nature-900 mb-4">Get Involved</h2>
            <p className="text-lg text-nature-700 max-w-3xl mx-auto">
              There are many ways you can contribute to Anandwan's mission. Every bit of support makes a difference in the lives of our community members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full transform transition-transform hover:scale-105">
              <div className="bg-nature-600 p-8 text-white text-center">
                <Users className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold">Volunteer With Us</h3>
              </div>
              <div className="p-8 flex-grow">
                <p className="text-nature-700 mb-6">
                  Share your skills, time, and compassion. Join our community of volunteers making a real difference in Anandwan.
                </p>
                <ul className="space-y-2 mb-8 text-nature-700">
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Medical assistance and healthcare support</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Teaching and educational programs</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Creative arts and cultural activities</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Technical and digital skills sharing</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-nature-600 hover:bg-nature-700">
                  <Link to="/volunteer">Register as Volunteer</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full transform transition-transform hover:scale-105">
              <div className="bg-earth-600 p-8 text-white text-center">
                <Heart className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold">Make a Donation</h3>
              </div>
              <div className="p-8 flex-grow">
                <p className="text-nature-700 mb-6">
                  Support our work through donations of money, supplies, or resources. Your generosity helps sustain our community.
                </p>
                <ul className="space-y-2 mb-8 text-nature-700">
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Financial contributions for projects</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Medical supplies and equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Educational materials and resources</span>
                  </li>
                  <li className="flex items-start">
                    <Leaf className="h-5 w-5 text-nature-500 mr-2 mt-0.5" />
                    <span>Clothing, household items, and more</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-earth-600 hover:bg-earth-700">
                  <Link to="/donate">Donate Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-nature-800 to-nature-900 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-nature-200 max-w-3xl mx-auto">
              For decades, Anandwan has been creating positive change in the lives of thousands of individuals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform transition-transform hover:scale-105">
              <div className="text-4xl font-bold mb-2 text-nature-200">5,000+</div>
              <div className="text-lg text-nature-300">Lives Transformed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform transition-transform hover:scale-105">
              <div className="text-4xl font-bold mb-2 text-nature-200">2,500+</div>
              <div className="text-lg text-nature-300">Acres of Land Cultivated</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform transition-transform hover:scale-105">
              <div className="text-4xl font-bold mb-2 text-nature-200">15+</div>
              <div className="text-lg text-nature-300">Educational Initiatives</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform transition-transform hover:scale-105">
              <div className="text-4xl font-bold mb-2 text-nature-200">70+</div>
              <div className="text-lg text-nature-300">Years of Service</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-nature-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-nature-900 mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg text-nature-700 max-w-2xl mx-auto mb-8">
            Join our community of changemakers working together to support Anandwan's mission and create a better world for all.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-nature-600 hover:bg-nature-700 text-white px-8 py-6 text-lg">
              <Link to="/volunteer">Volunteer Today</Link>
            </Button>
            <Button asChild className="bg-earth-600 hover:bg-earth-700 text-white px-8 py-6 text-lg">
              <Link to="/donate">Make a Donation</Link>
            </Button>
            <Button asChild variant="outline" className="border-nature-600 text-nature-700 hover:bg-nature-50 px-8 py-6 text-lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
