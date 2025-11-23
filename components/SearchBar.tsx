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

    // Fetch and index documents from all data files
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // List of all data files in the data folder
        const dataFiles = [
          'alss.json',
   
        ];
        
        // Fetch all data files in parallel
        const fetchPromises = dataFiles.map(async (filename) => {
          const response = await fetch(`/data/${filename}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for ${filename}`);
          }
          return response.json();
        });
        
        const dataArrays = await Promise.all(fetchPromises);
        
        // Combine all documents from all files with unique IDs
        let allDocuments: Document[] = [];
        let uniqueIdCounter = 1;
        
        dataArrays.forEach((data, index) => {
          if (!data.documents || !Array.isArray(data.documents)) {
            throw new Error(`Invalid data format in ${dataFiles[index]}`);
          }
          
          // Create documents with unique IDs
          const documentsWithUniqueIds = data.documents.map((doc: any) => ({
            ...doc,
            id: uniqueIdCounter++
          }));
          
          allDocuments = allDocuments.concat(documentsWithUniqueIds);
        });
        
        search.addAll(allDocuments);
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

    // Map search results to Document objects
    const documents: Document[] = results.map(result => ({
      id: result.id as number,
      module: result.module as string,
      title: result.title as string,
      category: result.category as string,
      year: result.year as string,
      link: result.link as string
    }));

    onSearchResults(documents);
  };

  if (error) {
    return (
      <div className="bg-red-50/80 backdrop-blur-xl border border-red-200/50 rounded-lg p-4 text-red-600 shadow-lg">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center text-gray-500 shadow-xl">
        Loading search data...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-8 hover:bg-white/80">
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
        
        {/* Bottom Row - Search Type Toggle and Action Icons */}
        <div className="flex items-center justify-between">
          {/* Search Type Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSearchType('papers')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-md ${
                searchType === 'papers' 
                  ? 'bg-teal-600/90 text-white shadow-lg shadow-teal-600/25' 
                  : 'bg-white/50 text-gray-600 hover:bg-white/70 shadow-md'
              }`}
            >
              Papers
            </button>
            <button
              onClick={() => setSearchType('questions')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-md ${
                searchType === 'questions' 
                  ? 'bg-teal-600/90 text-white shadow-lg shadow-teal-600/25' 
                  : 'bg-white/50 text-gray-600 hover:bg-white/70 shadow-md'
              }`}
            >
              Questions
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md">
              <Paperclip size={18} className="text-gray-400" />
            </button>
            
            <button className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md">
              <Image size={18} className="text-gray-400" />
            </button>
            
            <button className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md">
              <MapPin size={18} className="text-gray-400" />
            </button>
            
            <button className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md">
              <Mic size={18} className="text-gray-400" />
            </button>
            
            <button className="px-4 py-2 bg-teal-600/90 text-white rounded-xl hover:bg-teal-600 transition-all duration-200 ml-2 shadow-lg shadow-teal-600/25 backdrop-blur-md hover:shadow-xl hover:shadow-teal-600/30">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}