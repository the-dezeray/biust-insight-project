'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Upload, FileText, Home } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import MaintainerCard from '@/components/MaintainerCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AppSidebar } from '@/components/AppSidebar';

import { useEffect} from 'react';
import { AnimatedNumber } from '@/components/motion-primitives/animated-number';

interface Document {
  id: number;
  module: string;
  title: string;
  category: string;
  year: string;
  link: string;
}

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Document[]>([]);
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
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="max-w-2xl w-full">
              {/* Logo */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-gray-900 tracking-wide">insight-<AnimatedNumber value={versionNumber} springOptions= {{
          bounce: 0,
          duration: 10000,
        }}/></h1>

              </div>

              {/* Search Bar */}
              <SearchBar onSearchResults={setSearchResults} />

              {/* Search Results */}
              <SearchResults results={searchResults} />
            </div>
          </div>
        </main>

        {/* Maintainer Card */}
        <MaintainerCard />

        {/* Upload Modal */}
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-teal-700 text-xl flex items-center gap-2">
                <Upload size={20} />
                Upload Documents
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Drag and Drop Area */}
              <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors duration-300">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                    <FileText size={32} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drag & drop your files here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Or click to browse files
                    </p>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300">
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>

              {/* Supported Formats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Supported formats:</h4>
                <div className="flex flex-wrap gap-2">
                  {['PDF', 'DOC', 'DOCX', 'TXT', 'MD'].map((format) => (
                    <span key={format} className="px-2 py-1 bg-white text-xs text-gray-600 rounded border">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300">
                  Upload
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
