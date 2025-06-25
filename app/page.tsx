'use client';

import { useState } from 'react';
import { Plus, Home, Compass, Grid3x3, User, ArrowUp, Download, HelpCircle } from 'lucide-react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

interface Document {
  id: number;
  module: string;
  title: string;
  category: string;
  year: string;
  link: string;
}

export default function PerplexityLayout() {
  const [searchResults, setSearchResults] = useState<Document[]>([]);

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
            <Home size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Compass size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Grid3x3 size={20} className="text-gray-600" />
          </button>
        </div>
        
        {/* Bottom Icons */}
        <div className="flex-1"></div>
        <div className="flex flex-col space-y-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <User size={20} className="text-gray-600" />
          </button>
          
          <button className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            <ArrowUp size={16} />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Logo */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="max-w-2xl w-full">
            {/* Perplexity Logo */}
            <div className="text-center mb-12">
              <h1 className="text-4xl bold font-light text-gray-900 tracking-wide">biust insight project</h1>
            </div>

            {/* Search Bar */}
            <SearchBar onSearchResults={setSearchResults} />

            {/* Search Results */}
            <SearchResults results={searchResults} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-8 py-4">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-gray-700 transition-colors">Pro</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Enterprise</a>
              <a href="#" className="hover:text-gray-700 transition-colors">API</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Blog</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Careers</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Store</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Finance</a>
              <div className="flex items-center space-x-1">
                <span>English</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <button className="hover:text-gray-700 transition-colors ml-6">
                <HelpCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
