'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import Navigation from '@/components/Navigation';
import MaintainerCard from '@/components/MaintainerCard';

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
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Left Sidebar */}
      1<Navigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Logo */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="max-w-2xl w-full">
            {/* Perplexity Logo */}
            <div className="text-center mb-12">
              <h1 className="text-3xl bold font-oswald text-gray-900 tracking-wide">insight-04.2</h1>
            </div>

            {/* Search Bar */}
            <SearchBar onSearchResults={setSearchResults} />

            {/* Search Results */}
            <SearchResults results={searchResults} />
          </div>
        </div>
      </div>

      {/* Maintainer Card */}
      <MaintainerCard />
    </div>
  );
}
