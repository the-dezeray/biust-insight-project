'use client';

import { useState } from 'react';
import { SearchIcon, Grid3x3, PlusIcon, User, Upload, FileText, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from "sonner";

export default function Navigation() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <>
      <div className="w-20 bg-white/70 backdrop-blur-xl border-r border-white/20 flex flex-col items-center py-6 space-y-8 shadow-xl">
      {/* Logo */}
      <div className="w-10 h-10 bg-gradient-to-br from-teal-600/80 to-teal-800/80 rounded-lg flex items-center justify-center shadow-lg shadow-teal-600/25 backdrop-blur-md">
        <div className="w-5 h-5 bg-white rounded-sm"></div>
      </div>
      
      {/* Navigation Icons */}
      <div className="flex flex-col space-y-6">
        {/* Home/Search */}
        <a href="/" className="flex flex-col items-center p-3 hover:bg-white/50 rounded-xl transition-all duration-300 group">
          <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/50 transition-all duration-300 shadow-md hover:shadow-lg">
            <SearchIcon size={24} className="text-gray-600 group-hover:text-gray-700" />
          </div>
          <span className="text-xs text-gray-600 font-medium group-hover:text-gray-700">Search</span>
        </a>
        
        {/* View All Files */}
        <a href="/browse" className="flex flex-col items-center p-3 hover:bg-white/50 rounded-xl transition-all duration-300 group">
          <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/50 transition-all duration-300 shadow-md hover:shadow-lg">
            <Grid3x3 size={24} className="text-gray-600 group-hover:text-gray-700" />
          </div>
          <span className="text-xs text-gray-600 font-medium group-hover:text-gray-700">Browse</span>
        </a>
        
        {/* Add Documents */}
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex flex-col items-center p-3 hover:bg-white/50 rounded-xl transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/50 transition-all duration-300 shadow-md hover:shadow-lg">
            <PlusIcon size={24} className="text-gray-600 group-hover:text-gray-700" />
          </div>
          <span className="text-xs text-gray-600 font-medium group-hover:text-gray-700">upload content</span>
        </button>
      </div>
      
      {/* Bottom Icons */}
      <div className="flex-1"></div>
      <div className="flex flex-col space-y-4">
        <button onClick={() => toast("Will be implemented in the future")} className="flex flex-col items-center p-3 hover:bg-white/50 rounded-xl transition-all duration-300 group">
          <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/50 transition-all duration-300 shadow-md hover:shadow-lg">
            <User size={24} className="text-gray-600 group-hover:text-gray-700" />
          </div>
          <span className="text-xs text-gray-600 font-medium group-hover:text-gray-700">Profile</span>
        </button>
      </div>
    </div>

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
  </>
  );
}
