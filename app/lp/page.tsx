'use client';

import { useState } from 'react';
import { FileText, Plus, Download, BarChart3, Clock, Percent, CheckCircle, ExternalLink, Eye, Search, Filter, TrendingUp, BookOpen, Target, Zap } from 'lucide-react';

// Define the type for question analytics
type QuestionAnalytics = {
  id: number;
  question: string;
  frequency: number;
  sources: { year: number; exam: string; section: string; }[];
  variationPercentage: number;
  answer: string;
};

export default function LandingPage() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionAnalytics | null>(null);
  const [activeTab, setActiveTab] = useState('analytics');

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Enhanced Google Drive URL with zoom parameters
  const getIframeSrc = () => {
    const baseUrl = "https://drive.google.com/file/d/11HkxcCi7Zy_riO-U_khWWYcKUdBrAnWX/preview";
    return `${baseUrl}?usp=sharing&rm=minimal&zoom=150`;
  };

  // Sample data for questions analytics
  const questionAnalytics = [
    {
      id: 1,
      question: "What is the primary function of mitochondria in cellular respiration?",
      frequency: 12,
      sources: [
        { year: 2020, exam: "Bio 2020 Test Paper", section: "A" },
        { year: 2021, exam: "Bio 2021 Test Paper", section: "B" },
        { year: 2022, exam: "Bio 2022 Test Paper", section: "A" },
        { year: 2023, exam: "Bio 2023 Test Paper", section: "C" },
        { year: 2024, exam: "Bio 2024 Test Paper", section: "A" }
      ],
      variationPercentage: 85,
      answer: "Mitochondria are responsible for producing ATP through oxidative phosphorylation during cellular respiration."
    },
    {
      id: 2,
      question: "Explain the process of photosynthesis in green plants.",
      frequency: 8,
      sources: [
        { year: 2019, exam: "Bio 2019 Test Paper", section: "B" },
        { year: 2021, exam: "Bio 2021 Test Paper", section: "A" },
        { year: 2023, exam: "Bio 2023 Test Paper", section: "B" },
        { year: 2024, exam: "Bio 2024 Test Paper", section: "C" }
      ],
      variationPercentage: 92,
      answer: "Photosynthesis is the process by which plants convert light energy into chemical energy, producing glucose and oxygen from carbon dioxide and water."
    },
    {
      id: 3,
      question: "Describe the structure and function of DNA.",
      frequency: 15,
      sources: [
        { year: 2018, exam: "Bio 2018 Test Paper", section: "A" },
        { year: 2019, exam: "Bio 2019 Test Paper", section: "C" },
        { year: 2020, exam: "Bio 2020 Test Paper", section: "B" },
        { year: 2021, exam: "Bio 2021 Test Paper", section: "A" },
        { year: 2022, exam: "Bio 2022 Test Paper", section: "C" },
        { year: 2023, exam: "Bio 2023 Test Paper", section: "A" },
        { year: 2024, exam: "Bio 2024 Test Paper", section: "B" }
      ],
      variationPercentage: 78,
      answer: "DNA is a double-helix structure composed of nucleotides that stores genetic information and serves as the blueprint for protein synthesis."
    },
    {
      id: 4,
      question: "What are the main types of chemical bonds?",
      frequency: 6,
      sources: [
        { year: 2020, exam: "Chemistry 2020 Test Paper", section: "A" },
        { year: 2022, exam: "Chemistry 2022 Test Paper", section: "B" },
        { year: 2024, exam: "Chemistry 2024 Test Paper", section: "A" }
      ],
      variationPercentage: 67,
      answer: "The main types of chemical bonds are ionic bonds, covalent bonds, and metallic bonds, each formed through different electron interactions."
    }
  ];

  const testVariations = [
    { id: 1, title: "Biology Test Paper 2024 - Version A", hasAnswers: true, subject: "Biology", year: 2024 },
    { id: 2, title: "Biology Test Paper 2024 - Version B", hasAnswers: false, subject: "Biology", year: 2024 },
    { id: 3, title: "Chemistry Quiz - Organic Compounds", hasAnswers: true, subject: "Chemistry", year: 2024 },
    { id: 4, title: "Physics Problem Set - Mechanics", hasAnswers: false, subject: "Physics", year: 2024 },
  ];

  const stats = [
    { icon: BookOpen, label: "Total Questions", value: "1,247", color: "text-gray-600" },
    { icon: Target, label: "High Frequency", value: "86", color: "text-gray-600" },
    { icon: TrendingUp, label: "Trend Analysis", value: "94%", color: "text-gray-600" },
    { icon: Zap, label: "Success Rate", value: "78%", color: "text-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
        {/* Logo */}
        <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
        
        {/* Navigation Icons */}
        <div className="flex flex-col space-y-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Plus size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BookOpen size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <BarChart3 size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FileText size={20} className="text-gray-600" />
          </button>
        </div>
        
        {/* Bottom Icons */}
        <div className="flex-1"></div>
        <div className="flex flex-col space-y-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <TrendingUp size={16} />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Title */}
        <div className="flex-1 flex flex-col px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Title */}
            <div className="text-center mb-8 pt-8">
              <h1 className="text-4xl font-light text-gray-900 tracking-wide">biust insight project</h1>
              <p className="text-lg text-gray-600 mt-2">Interactive document analysis & test generation platform</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Document Viewer - Takes up 2/3 of the space */}
              <div className="xl:col-span-2 space-y-6">
                {/* Document Viewer */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-600" />
                        Document Viewer
                      </h2>
                      <button
                        onClick={toggleMaximize}
                        className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {isMaximized ? 'Minimize' : 'Maximize'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-0">
                    <div className={`transition-all duration-300 ease-in-out ${
                      isMaximized ? 'fixed inset-0 z-50 bg-white' : 'relative'
                    }`}>
                      {isMaximized && (
                        <div className="absolute top-4 right-4 z-10">
                          <button
                            onClick={toggleMaximize}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      <iframe
                        src={getIframeSrc()}
                        className={`w-full border-none ${isMaximized ? 'h-screen' : 'h-[500px]'}`}
                        frameBorder="0"
                        allow="autoplay"
                      />
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'analytics'
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Question Analytics
                        </div>
                      </button>
                      <button
                        onClick={() => setActiveTab('variations')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === 'variations'
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Test Variations
                        </div>
                      </button>
                    </nav>
                  </div>

                  <div className="p-6">
                    {activeTab === 'analytics' && (
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {questionAnalytics.map((item, index) => (
                          <div 
                            key={item.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                              selectedQuestion?.id === item.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedQuestion(selectedQuestion?.id === item.id ? null : item)}
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                                      Q{index + 1}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                                      item.frequency > 10 ? 'bg-gray-100 text-gray-700' : 
                                      item.frequency > 5 ? 'bg-gray-100 text-gray-600' : 
                                      'bg-gray-100 text-gray-500'
                                    }`}>
                                      {item.frequency > 10 ? 'High' : item.frequency > 5 ? 'Medium' : 'Low'} Frequency
                                    </span>
                                  </div>
                                  <p className="font-medium text-gray-800">{item.question}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-500" />
                                  <span className="text-gray-600">Asked {item.frequency} times</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Percent className="w-4 h-4 text-gray-500" />
                                  <span className="text-gray-600">Variation: {item.variationPercentage}%</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {item.sources.slice(0, 2).map((source, idx) => (
                                    <button
                                      key={idx}
                                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded transition-colors duration-200 flex items-center gap-1"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('Clicked source:', source);
                                      }}
                                    >
                                      {source.exam}
                                      <ExternalLink className="w-3 h-3" />
                                    </button>
                                  ))}
                                </div>
                                
                                <button 
                                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('View all sources for question:', item.id);
                                  }}
                                >
                                  <Eye className="w-3 h-3" />
                                  View All
                                </button>
                              </div>
                              
                              {selectedQuestion?.id === item.id && (
                                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 mb-1">Answer:</p>
                                      <p className="text-sm text-gray-700">{item.answer}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'variations' && (
                      <div className="space-y-4">
                        {testVariations.map((test) => (
                          <div key={test.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{test.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-500">{test.subject} • {test.year}</span>
                                  {test.hasAnswers && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                      With Answers
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add New Test Paper
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar - Takes up 1/3 of the space */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Generate New Test
                    </button>
                    <button className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      View Analytics
                    </button>
                    <button className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Data
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-700">Biology test generated</span>
                      <span className="text-gray-500 text-xs ml-auto">2m ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-700">Analytics updated</span>
                      <span className="text-gray-500 text-xs ml-auto">15m ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-700">Document uploaded</span>
                      <span className="text-gray-500 text-xs ml-auto">1h ago</span>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Use the maximize button for better document viewing</p>
                    <p>• Click on questions to see detailed answers</p>
                    <p>• High frequency questions are exam favorites</p>
                    <p>• Check variation percentages for question patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-8 py-4">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-gray-700 transition-colors">Analytics</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Documentation</a>
              <a href="#" className="hover:text-gray-700 transition-colors">API</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Support</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">About</a>
              <div className="flex items-center space-x-1">
                <span>English</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}