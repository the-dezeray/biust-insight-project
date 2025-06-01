import React, { useEffect } from 'react';
import { useAnimate, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaAtom, FaDna, FaSquareRootAlt, FaFlask, FaChartBar, FaCog, FaLaptopCode, FaBook, FaMountain } from 'react-icons/fa';

function SubjectItem({ Icon, title, percentage, link, delay }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, delay });
    }
  }, [isInView, animate, delay]);

  // Circle percentage configuration
  const size = 36;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <a href={link} className="block">
      <div 
        ref={scope} 
        className="bg-transparent border border-zinc-700 p-4 rounded-lg hover:border-purple-500 transition-colors cursor-pointer flex justify-between items-center"
        style={{ opacity: 0, y: 30 }}
        data-subject={title.split(' ')[0]}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-purple-400 mr-3" />
          <h3 className="font-medium text-white">{title}</h3>
        </div>
        <div className="relative">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <circle 
              cx={size/2} 
              cy={size/2} 
              r={radius}
              fill="transparent"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle 
              cx={size/2} 
              cy={size/2} 
              r={radius}
              fill="transparent"
              stroke="rgba(168,85,247,0.8)" // purple-500 with some transparency
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size/2} ${size/2})`}
            />
            {/* Percentage text */}
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              fill="white"
              fontSize="10"
              fontWeight="medium"
            >
              {percentage}%
            </text>
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function Features() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 }, { duration: 0.5 });
    }
  }, [isInView, animate]);

  const subjects = [
    { title: "PHYS 101", Icon: FaAtom, percentage: 75, link: "/biust-insight-project/docs/category/physics-modules" },
    { title: "PHYS 102", Icon: FaAtom, percentage: 60, link: "/biust-insight-project/docs/category/physics-modules" },
    { title: "BIO 101", Icon: FaDna, percentage: 80, link: "/biust-insight-project/docs/category/biology-modules" },
    { title: "BIO 102", Icon: FaDna, percentage: 65, link: "/biust-insight-project/docs/category/biology-modules" },
    { title: "MATH 101", Icon: FaSquareRootAlt, percentage: 70, link: "/biust-insight-project/docs/category/math-modules" },
    { title: "MATH 102", Icon: FaSquareRootAlt, percentage: 60, link: "/biust-insight-project/docs/category/math-modules" },
    { title: "CHEM 101", Icon: FaFlask, percentage: 80, link: "/biust-insight-project/docs/category/chemistry-modules" },
    { title: "CHEM 102", Icon: FaFlask, percentage: 75, link: "/biust-insight-project/docs/category/chemistry-modules" },
    { title: "STATS 101", Icon: FaChartBar, percentage: 70, link: "/biust-insight-project/docs/category/statistics-modules" },
    { title: "CETG 101", Icon: FaCog, percentage: 80, link: "/biust-insight-project/docs/category/cetg-modules" },
    { title: "CETG 102", Icon: FaCog, percentage: 75, link: "/biust-insight-project/docs/category/cetg-modules" },
    { title: "COMP 201", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 211", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 221", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 231", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 232", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 222", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "ALSS 201", Icon: FaBook, percentage: 70, link: "/biust-insight-project/docs/category/alss-modules" },
    { title: "GEOL 201", Icon: FaMountain, percentage: 70, link: "/biust-insight-project/docs/category/geol-modules" }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white">Course <span className="text-purple-500">Modules</span></h2>
        <Link to="/docs/category/all-modules" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors flex items-center">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div 
        ref={scope} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{ opacity: 0 }}
      >
        {subjects.map((subject, index) => (
          <SubjectItem
            key={subject.title}
            Icon={subject.Icon}
            title={subject.title}
            percentage={subject.percentage}
            link={subject.link}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}