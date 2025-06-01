import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import Star from "./star";
import FeaturesAndModules from "../Features/Features";

export default function BiustInsight() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Modules", href: "/docs/category/modules" },
    { name: "Research", href: "/research" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
  ];

  const modules = [
    { title: "Quantum Physics", count: "42 papers" },
    { title: "Materials Science", count: "36 papers" },
    { title: "Artificial Intelligence", count: "58 papers" },
    { title: "Biotechnology", count: "27 papers" },
    { title: "Astronomy", count: "31 papers" },
    { title: "Sustainable Energy", count: "45 papers" }
  ];

  const stats = [
    { value: "500+", label: "Research Papers" },
    { value: "50+", label: "Contributors" },
    { value: "1000+", label: "Active Users" },
    { value: "25+", label: "Categories" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-300">
      {/* Subtle background effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      </div>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white flex items-center">
            <span className="text-purple-500">Biust</span>
            <span className="text-white ml-1">Insight</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-sm text-zinc-400 hover:text-purple-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-zinc-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section with centered Star */}
        <div className="w-full flex flex-col items-center justify-center pt-32 pb-16">
          <div className="flex justify-center mb-6">
            <Star />
          </div>
          <h1 className="py-4 text-4xl font-bold sm:text-6xl md:text-7xl text-white">
            BIUST <span className="text-purple-500">Insight</span> Project
          </h1>
          
          <div className="my-8 text-center max-w-2xl px-4">
            <p className="text-lg text-zinc-400">
              An immersive archive of matter, knowledge, and research designed for the modern digital landscape.
            </p>
          </div>
          
          {/* Updated buttons with spotlight effect */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              className="relative overflow-hidden rounded-md bg-purple-600/90 p-[1px] transition duration-300 hover:bg-purple-700"
              to="/docs/category/modules"
            >
              <div className="relative rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white">
                Explore Now
              </div>
            </Link>
            <Link
              className="relative overflow-hidden rounded-md bg-zinc-800/30 p-[1px] border border-zinc-800 transition duration-300 hover:border-purple-600"
              to="/about"
            >
              <div className="relative rounded-md px-6 py-3 text-sm font-medium text-zinc-400 hover:text-purple-400">
                Learn More
              </div>
            </Link>
          </div>
        </div>
        
        {/* Stats section with modern card design */}
        <div className="w-full max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative overflow-hidden rounded-2xl bg-zinc-300/10 p-[1px] dark:bg-zinc-600/30">
                <div className="relative h-full w-full rounded-[15px] bg-zinc-950 p-4">
                  <div className="text-2xl md:text-3xl font-bold text-purple-500">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <FeaturesAndModules/>
        
        {/* CTA section with spotlight effect */}
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
          <div className="relative overflow-hidden rounded-2xl bg-zinc-300/10 p-[1px] dark:bg-zinc-600/30">
            <div className="relative h-full w-full rounded-[15px] bg-zinc-900 p-8 text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-600"></div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to dive deeper?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-zinc-400">
                Join our community of researchers and enthusiasts to explore the vast archive of knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  className="relative overflow-hidden rounded-md bg-purple-600/90 p-[1px] transition duration-300 hover:bg-purple-700"
                  to="/docs/category/modules"
                >
                  <div className="relative rounded-md bg-purple-600 px-6 py-3 text-sm font-medium text-white">
                    Get Started
                  </div>
                </Link>
                <Link
                  className="relative overflow-hidden rounded-md bg-zinc-800/30 p-[1px] border border-zinc-700 transition duration-300 hover:border-purple-600"
                  to="#"
                >
                  <div className="relative rounded-md px-6 py-3 text-sm font-medium text-zinc-400 hover:text-purple-400">
                    Watch Demo
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer with updated styles */}
      <footer className="w-full max-w-6xl mx-auto px-4 py-8 border-t border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="text-purple-500">Biust</span>
              <span className="text-white">Insight</span>
            </h3>
            <p className="text-sm text-zinc-500 mb-4">A digital archive of knowledge for researchers, academics, and curious minds.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Documentation</Link></li>
              <li><Link to="#" className="hover:text-purple-400 transition-colors">API</Link></li>
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Research Papers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Community</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Forums</Link></li>
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Events</Link></li>
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Contributors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Email Us</Link></li>
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Support</Link></li>
              <li><Link to="#" className="hover:text-purple-400 transition-colors">Partners</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-zinc-600 pt-6 border-t border-zinc-900">
          © {new Date().getFullYear()} Biust Insight Project. All rights reserved.
        </div>
      </footer>
      
      {/* Add custom styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgb(40, 40, 40) 1px, transparent 1px),
                            linear-gradient(to bottom, rgb(40, 40, 40) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}