'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, ArrowUp, Paperclip, Image, MapPin, Mic, Loader2 } from 'lucide-react';
import { searchDocuments } from '@/app/actions/search';
import type { SearchResult, SearchType } from '@/lib/types';

interface SearchBarProps {
  onSearchResults: (results: SearchResult[]) => void;
}

const DEBOUNCE_MS = 300;

export default function SearchBar({ onSearchResults }: SearchBarProps) {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('papers');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const runSearch = useCallback(
    async (text: string, type: SearchType) => {
      if (!text.trim()) {
        onSearchResults([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      const id = ++requestId.current;
      setIsLoading(true);
      setError(null);

      const result = await searchDocuments(text, type);

      // Ignore stale responses.
      if (id !== requestId.current) return;

      setIsLoading(false);

      if (result.error) {
        setError(result.error);
        onSearchResults([]);
        return;
      }
      onSearchResults(result.data ?? []);
    },
    [onSearchResults],
  );

  useEffect(() => {
    const timer = setTimeout(() => runSearch(searchText, searchType), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchText, searchType, runSearch]);

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
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-lg"
          />

          {isLoading && <Loader2 size={18} className="text-teal-600 animate-spin mr-2" />}
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

      {error && (
        <div className="mt-3 bg-red-50/80 backdrop-blur-xl border border-red-200/50 rounded-lg p-3 text-sm text-red-600 shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
