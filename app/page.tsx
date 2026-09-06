'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import DiscoverSection from '@/components/DiscoverSection';
import MaintainerCard from '@/components/MaintainerCard';
import { UploadModal } from '@/components/UploadModal';
import { AppSidebar } from '@/components/AppSidebar';

import { useEffect} from 'react';
import { AnimatedNumber } from '@/components/motion-primitives/animated-number';
import type { SearchResult } from '@/lib/types';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
const  [versionNumber, setVersionNumber] = useState(0);
  useEffect(()=>{setVersionNumber(4.2)},[]);
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative">
        <AppSidebar onUploadClick={() => setIsUploadModalOpen(true)} />

        <main className="flex-1 flex flex-col">
          <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-xl p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
              <div className="flex items-center gap-2">
                <Home size={20} className="text-teal-600" />
                <h1 className="text-xl font-semibold text-gray-900">Home</h1>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex flex-col px-8 overflow-y-auto">
            <div className="max-w-2xl w-full mx-auto">
              {/* Spacer to push search bar to center */}
              <div className="min-h-[30vh]" />
              
              {/* Logo */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-gray-900 tracking-wide">insight-<AnimatedNumber value={versionNumber} springOptions= {{
          bounce: 0,
          duration: 10000,
        }}/></h1>

              </div>

              {/* Search Bar */}
              <SearchBar onSearchResults={setSearchResults} />

              {/* Search Results or Discover Section */}
              {searchResults.length > 0 ? (
                <SearchResults results={searchResults} />
              ) : (
                <DiscoverSection />
              )}
              
              {/* Bottom padding */}
              <div className="min-h-[20vh]" />
            </div>
          </div>
        </main>

        {/* Maintainer Card */}
        <MaintainerCard />

        {/* Upload Modal */}
        <UploadModal open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
      </div>
    </SidebarProvider>
  );
}
