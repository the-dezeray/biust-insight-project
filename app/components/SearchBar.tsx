'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowUp, Paperclip, Image, MapPin, Mic } from 'lucide-react';
import MiniSearch from 'minisearch';

interface Document {
  id: number;
  module: string;
  title: string;
  category: string;
  year: string;
  link: string;
}

interface SearchBarProps {
  onSearchResults: (results: Document[]) => void;
}

export default function SearchBar({ onSearchResults }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState<'questions' | 'papers'>('papers');
  const [miniSearch, setMiniSearch] = useState<MiniSearch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize MiniSearch
    const search = new MiniSearch({
      fields: ['module', 'title', 'category'], // fields to index
      storeFields: ['id', 'module', 'title', 'category', 'year', 'link'], // fields to return with results
      searchOptions: {
        boost: { title: 2, module: 1 }, // boost title matches
        fuzzy: 0.2, // enable fuzzy search
      }
    });

    // Fetch and index documents
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.documents || !Array.isArray(data.documents)) {
          throw new Error('Invalid data format');
        }
        
        search.addAll(data.documents);
        setMiniSearch(search);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load search data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    
    if (!miniSearch) return;

    const results = miniSearch.search(text, {
      filter: (result) => {
        if (searchType === 'questions') {
          return result.category === 'test' || result.category === 'quiz';
        } else {
          return result.category === 'exam' || result.category === 'supplementary';
        }
      }
    });

    onSearchResults(results);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
        Loading search data...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 px-6 py-8">
        {/* Top Row - Search Input */}
        <div className="flex items-center mb-6">
          <Search size={20} className="text-gray-400 mr-4" />
          
          <input
            type="text"
            placeholder="Search for papers or questions..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-lg"
          />
        </div>
        
        {/* Search Type Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setSearchType('papers')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                searchType === 'papers' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Papers
            </button>
            <button
              onClick={() => setSearchType('questions')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                searchType === 'questions' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Questions
            </button>
          </div>
        </div>
        
        {/* Bottom Row - Action Icons */}
        <div className="flex items-center justify-end space-x-1">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Paperclip size={18} className="text-gray-400" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Image size={18} className="text-gray-400" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MapPin size={18} className="text-gray-400" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Mic size={18} className="text-gray-400" />
          </button>
          
          <button className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors ml-2">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
} 