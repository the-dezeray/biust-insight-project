import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import { motion } from "framer-motion";

export default function MinimalistBiust() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { name: "Home", href: "#" },
    { name: "Modules", href: "/docs/category/modules" },
    { name: "Research", href: "#" },
    { name: "Community", href: "#" },
    { name: "About", href: "#" },
  ];

  const modules = [
    { title: "Quantum Physics", count: "42 papers" },
    { title: "Materials Science", count: "36 papers" },
    { title: "Artificial Intelligence", count: "58 papers" },
    { title: "Biotechnology", count: "27 papers" },
    { title: "Astronomy", count: "31 papers" },
    { title: "Sustainable Energy", count: "45 papers" }
  ];

  // Simple stats
  const stats = [
    { value: "500+", label: "Research Papers" },
    { value: "50+", label: "Contributors" },
    { value: "1000+", label: "Active Users" },
    { value: "25+", label: "Categories" }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-black text-zinc-300">
      {/* Animated background waves inspired by the card */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      {/* Subtle particles */}
      <div className="absolute inset-0 -z-5">
        <div id="particles" className="absolute inset-0"></div>
      </div>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">
            <span className="gradient-text">Biust Insight</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-sm duration-500 text-zinc-500 hover:text-purple-400"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section */}
        <motion.div 
          className="w-full flex flex-col items-center justify-center pt-32 pb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="py-4 z-10 text-4xl cursor-default sm:text-6xl md:text-6xl whitespace-nowrap gradient-text"
            variants={slideUp}
          >
            BIUST Insight Project
          </motion.h1>
          
          <motion.div 
            className="my-8 text-center max-w-2xl px-4"
            variants={slideUp}
          >
            <p className="text-md text-zinc-400">
              An immersive archive of matter, knowledge, and research designed for the modern digital landscape.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-4"
            variants={staggerChildren}
          >
            <motion.div variants={slideUp}>
              <Link
                className="px-6 py-2 text-sm font-medium border border-purple-500 rounded-full transition duration-300 hover:bg-purple-900 hover:bg-opacity-30 hover:border-purple-400"
                to="/docs/category/modules"
              >
                Explore Now
              </Link>
            </motion.div>
            <motion.div variants={slideUp}>
              <Link
                className="px-6 py-2 text-sm font-medium border border-zinc-800 rounded-full text-zinc-500 transition duration-300 hover:border-purple-700 hover:text-purple-300"
                to="/docs/category/modules"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Stats section */}
        <motion.div 
          className="w-full max-w-4xl mx-auto px-4 py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" variants={slideUp}>
                <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Featured modules section */}
        <motion.div 
          className="w-full max-w-6xl mx-auto px-4 py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold gradient-text">Featured Modules</h2>
            <Link to="/docs/category/modules" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
          >
            {modules.map((module, index) => (
              <motion.div key={index} variants={slideUp}>
                <Link to="/docs/category/modules" className="group block">
                  <div className="p-6 transition-all duration-300 bg-zinc-800/30 border border-zinc-800 rounded-lg hover:bg-purple-900/10 hover:border-purple-500/30 group-hover:transform group-hover:scale-105">
                    <h3 className="text-lg font-medium text-zinc-200 mb-2 group-hover:text-purple-300">{module.title}</h3>
                    <p className="text-sm text-zinc-500">{module.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* CTA section */}
        <motion.div 
          className="w-full max-w-4xl mx-auto px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="cta-gradient-border p-8 text-center rounded-lg">
            <motion.h2 className="text-xl md:text-2xl font-bold mb-4 text-white" variants={slideUp}>Ready to dive deeper?</motion.h2>
            <motion.p className="text-md mb-8 max-w-2xl mx-auto text-zinc-400" variants={slideUp}>
              Join our community of researchers and enthusiasts to explore the vast archive of knowledge.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={staggerChildren}>
              <motion.div variants={slideUp}>
                <Link
                  className="px-6 py-2 text-sm font-medium border border-purple-500 rounded-full transition duration-300 hover:bg-purple-900 hover:bg-opacity-30 hover:border-purple-400"
                  to="/docs/category/modules"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div variants={slideUp}>
                <Link
                  className="px-6 py-2 text-sm font-medium border border-zinc-800 rounded-full text-zinc-500 transition duration-300 hover:border-purple-700 hover:text-purple-300"
                  to="#"
                >
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 py-8 border-t border-zinc-800 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 gradient-text">Biust Insight</h3>
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
      
      {/* Add custom styles for animations and gradients */}
      <style jsx>{`
        #particles {
          background-color: transparent;
          background-image: radial-gradient(#252525 0.5px, transparent 0.5px);
          background-size: 15px 15px;
        }
        
        .text-edge-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #af40ff, #5b42f3 60%, #00ddeb);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }
        
        .cta-gradient-border {
          position: relative;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid transparent;
          background-clip: padding-box;
        }
        
        .cta-gradient-border::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          margin: -1px;
          border-radius: inherit;
          background: linear-gradient(90deg, #af40ff, #5b42f3 60%, #00ddeb);
          opacity: 0.3;
        }
        
        .wave {
          position: absolute;
          width: 1000px;
          height: 1000px;
          opacity: 0.1;
          left: 50%;
          top: 50%;
          margin-left: -500px;
          margin-top: -500px;
          border-radius: 45%;
          background: linear-gradient(744deg, #af40ff, #5b42f3 60%, #00ddeb);
          animation: wave 30s infinite linear;
        }
        
        .wave2 {
          animation-duration: 25s;
          opacity: 0.08;
        }
        
        .wave3 {
          animation-duration: 35s;
          opacity: 0.05;
        }
        
        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}