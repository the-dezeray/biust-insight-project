import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";

export default function FullPage() {
  const pageRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    // Meteor animation effect
    const createMeteor = () => {
      const meteor = document.createElement('div');
      meteor.className = "absolute w-0.5 h-36 bg-gradient-to-b from-transparent via-white to-transparent opacity-0 transform -rotate-15 animate-meteor";
      meteor.style.left = `${Math.random() * 100}%`;
      meteor.style.top = `${Math.random() * 100}%`;
      meteor.style.animationDuration = `${Math.random() * 2 + 3}s`;
      
      if (pageRef.current) {
        pageRef.current.appendChild(meteor);
        setTimeout(() => {
          meteor.remove();
        }, 5000);
      }
    };
    
    // Parallax scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const meteorInterval = setInterval(createMeteor, 400);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(meteorInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white relative overflow-hidden" ref={pageRef}>
      {/* Fixed navbar that changes on scroll */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold">Biust Insight</div>
          <div className="hidden md:flex space-x-8">
            <Link to="/docs/category/modules" className="hover:text-purple-300 transition-colors">Modules</Link>
            <Link to="#" className="hover:text-purple-300 transition-colors">Research</Link>
            <Link to="#" className="hover:text-purple-300 transition-colors">Community</Link>
            <Link to="#" className="hover:text-purple-300 transition-colors">About</Link>
          </div>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 translate-y-32 -translate-x-32"></div>
      
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        {/* Hero section with glass morphism */}
        <div className="relative backdrop-blur-lg bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl shadow-2xl p-8 md:p-16 mb-16 overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Content wrapper for flex layout */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full gap-12">
            
            {/* Left side - text content */}
            <div className="max-w-2xl text-left">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-purple-600 bg-opacity-30 text-purple-200 rounded-full mb-6">DIGITAL ARCHIVE</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Biust Insight <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Project</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 font-light">
                An immersive archive of matter, knowledge, and research designed for the modern digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full text-center w-full sm:w-auto inline-flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                  to="/docs/category/modules"
                >
                  Explore Now
                </Link>
                <Link
                  className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white border border-white border-opacity-20 font-medium py-3 px-8 rounded-full text-center w-full sm:w-auto inline-flex items-center justify-center transition-all duration-300"
                  to="/docs/category/modules"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Right side - modern info boxes with hover effects */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-80">
              <div className="group bg-white bg-opacity-5 hover:bg-opacity-10 border border-white border-opacity-5 p-6 rounded-xl text-center font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-1">
                <div className="text-2xl mb-2 text-purple-300 group-hover:text-white transition-colors">50+</div>
                <div className="text-gray-400 group-hover:text-gray-200 transition-colors">Research Papers</div>
              </div>
              <div className="group bg-white bg-opacity-5 hover:bg-opacity-10 border border-white border-opacity-5 p-6 rounded-xl text-center font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-1">
                <div className="text-2xl mb-2 text-blue-300 group-hover:text-white transition-colors">120+</div>
                <div className="text-gray-400 group-hover:text-gray-200 transition-colors">Contributors</div>
              </div>
              <div className="group bg-white bg-opacity-5 hover:bg-opacity-10 border border-white border-opacity-5 p-6 rounded-xl text-center font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-1">
                <div className="text-2xl mb-2 text-green-300 group-hover:text-white transition-colors">25+</div>
                <div className="text-gray-400 group-hover:text-gray-200 transition-colors">Categories</div>
              </div>
              <div className="group bg-white bg-opacity-5 hover:bg-opacity-10 border border-white border-opacity-5 p-6 rounded-xl text-center font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-1">
                <div className="text-2xl mb-2 text-yellow-300 group-hover:text-white transition-colors">1K+</div>
                <div className="text-gray-400 group-hover:text-gray-200 transition-colors">Active Users</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured content cards with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group backdrop-blur-sm bg-white bg-opacity-5 border border-white border-opacity-5 p-8 rounded-xl transition-all duration-300 hover:bg-opacity-10 hover:translate-y-2 hover:shadow-lg">
            <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Featured Research</h2>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Explore our collection of curated articles and groundbreaking research papers from leading experts.</p>
          </div>
          <div className="group backdrop-blur-sm bg-white bg-opacity-5 border border-white border-opacity-5 p-8 rounded-xl transition-all duration-300 hover:bg-opacity-10 hover:translate-y-2 hover:shadow-lg">
            <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Latest Updates</h2>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Stay informed with our most recent additions, discoveries, and breakthroughs in the field.</p>
          </div>
          <div className="group backdrop-blur-sm bg-white bg-opacity-5 border border-white border-opacity-5 p-8 rounded-xl transition-all duration-300 hover:bg-opacity-10 hover:translate-y-2 hover:shadow-lg">
            <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">Community</h2>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Join discussions, collaborate on projects, and connect with researchers in our growing global community.</p>
          </div>
        </div>
        
        {/* Statistics section with modern styling */}
        <div className="backdrop-blur-sm bg-white bg-opacity-5 border border-white border-opacity-5 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Growing Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">500+</h3>
              <p className="text-gray-400">Research Papers</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">50+</h3>
              <p className="text-gray-400">Contributors</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">1000+</h3>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">25+</h3>
              <p className="text-gray-400">Categories</p>
            </div>
          </div>
        </div>
        
        {/* Featured modules section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Modules</h2>
            <Link to="/docs/category/modules" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Quantum Physics", count: "42 papers", color: "from-purple-500 to-pink-500" },
              { title: "Materials Science", count: "36 papers", color: "from-blue-500 to-cyan-500" },
              { title: "Artificial Intelligence", count: "58 papers", color: "from-green-500 to-emerald-500" },
              { title: "Biotechnology", count: "27 papers", color: "from-amber-500 to-yellow-500" },
              { title: "Astronomy", count: "31 papers", color: "from-red-500 to-orange-500" },
              { title: "Sustainable Energy", count: "45 papers", color: "from-violet-500 to-purple-500" }
            ].map((module, index) => (
              <Link key={index} to="/docs/category/modules" className="group">
                <div className="backdrop-blur-sm bg-white bg-opacity-5 border border-white border-opacity-5 rounded-xl p-6 transition-all duration-300 hover:bg-opacity-10 hover:translate-y-1 hover:shadow-lg">
                  <div className={`w-10 h-10 rounded-lg mb-4 bg-gradient-to-br ${module.color}`}></div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{module.title}</h3>
                  <p className="text-sm text-gray-400">{module.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Call to action with gradient background */}
        <div className="relative overflow-hidden rounded-2xl p-1 mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 animate-gradient"></div>
          <div className="relative backdrop-blur-lg bg-black bg-opacity-80 rounded-xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to dive deeper?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">Join our community of researchers and enthusiasts to explore the vast archive of knowledge and contribute to cutting-edge discoveries.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                className="bg-white text-purple-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-center inline-flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                to="/docs/category/modules"
              >
                Get Started
              </Link>
              <Link
                className="bg-transparent text-white border border-white border-opacity-20 font-medium py-3 px-8 rounded-full text-center inline-flex items-center justify-center transition-all duration-300 hover:bg-white hover:bg-opacity-10"
                to="#"
              >
                Watch Demo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer with modern styling */}
        <footer className="border-t border-white border-opacity-10 pt-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Biust Insight</h3>
              <p className="text-sm text-gray-400 mb-4">An advanced digital archive of matter and knowledge for researchers, academics, and curious minds.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">API</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Research Papers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Forums</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Discord</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contributors</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Email Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Partners</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 border-t border-white border-opacity-10 pt-6">
            © {new Date().getFullYear()} Biust Insight Project. All rights reserved.
          </div>
        </footer>
      </div>
      
      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes meteor {
          0% {
            opacity: 1;
            transform: translateY(-150px) translateX(0) rotate(-45deg);
          }
          100% {
            opacity: 0;
            transform: translateY(calc(100% + 150px)) translateX(150px) rotate(-45deg);
          }
        }
        .animate-meteor {
          animation: meteor 3s linear forwards;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}