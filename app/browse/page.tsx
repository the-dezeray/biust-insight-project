'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Grid3x3, FileText, Loader2, Calculator, Atom, FlaskConical, Binary, TrendingUp, Folder, BookOpen, Cpu, Zap, Earth, Upload } from 'lucide-react';
import { useSubjectData } from '@/hooks/useSubjectData';
import { AppSidebar } from '@/components/AppSidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Icon mapping for subject groups
const iconMap: Record<string, any> = {
  Calculator,
  Atom,
  FlaskConical,
  Binary,
  TrendingUp,
  Folder,
  BookOpen,
  Cpu,
  Zap,
  Earth,
};

export default function BrowsePage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { subjectGroups, isLoading, error } = useSubjectData();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-teal-50/20 relative overflow-hidden">
        <AppSidebar 
          selectedCourse={selectedCourse} 
          onCourseSelect={setSelectedCourse}
          onUploadClick={() => setIsUploadModalOpen(true)}
        />

        <main className="flex-1 flex flex-col min-w-0">
          <header className="border-b border-gray-200/50 bg-white/90 backdrop-blur-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
                  <Grid3x3 size={18} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Browse Resources</h1>
              </div>
            </div>
          </header>

          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Section */}
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Academic Resources</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Discover comprehensive study materials, research papers, and course content across various academic disciplines.
                </p>
              </div>

              {/* Selected Course Content */}
              {selectedCourse && !isLoading ? (
                (() => {
                  // Find the selected course and its subject
                  let selectedCourseData = null;
                  let selectedSubject = null;
                  
                  for (const subject of subjectGroups) {
                    const course = subject.courses.find(c => c.code === selectedCourse);
                    if (course) {
                      selectedCourseData = course;
                      selectedSubject = subject;
                      break;
                    }
                  }
                  
                  if (!selectedCourseData || !selectedSubject) return null;
                  
                  const IconComponent = iconMap[selectedSubject.icon] || Folder;
                  
                  return (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-8 mb-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${selectedSubject.color}`}>
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{selectedCourseData.code}</h3>
                          <p className="text-base text-gray-600 mt-1">
                            {selectedSubject.name} • {selectedCourseData.college}
                            {selectedCourseData.year && ` • ${selectedCourseData.year}`}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-bold text-gray-800 text-base">Available Documents</span>
                          <span className="bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 px-3 py-1.5 rounded-full text-sm font-medium">
                            {selectedCourseData.entries} document{selectedCourseData.entries !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4 text-base">Documents for {selectedCourseData.code} will be loaded here. This could include:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          <li>Past exam papers and tests</li>
                          <li>Assignment templates and solutions</li>
                          <li>Lecture notes and tutorials</li>
                          <li>Practical and lab materials</li>
                        </ul>
                      </div>
                    </div>
                  );
                })()
              ) : !isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {subjectGroups.map((subject) => {
                    const IconComponent = iconMap[subject.icon] || Folder;
                    return (
                      <div
                        key={subject.id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-8 hover:shadow-xl hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md ${subject.color}`}>
                            <IconComponent size={26} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300">
                              {subject.name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-base text-gray-600 leading-relaxed mb-6">
                          {subject.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText size={16} />
                            <span className="font-medium">{subject.courses.length} courses</span>
                          </div>
                          <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-medium">
                            {subject.totalEntries} documents
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {/* Stats Section */}
              {!isLoading && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Platform Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200">
                      <div className="text-3xl font-bold text-teal-700 mb-2">
                        {subjectGroups.reduce((sum, subject) => sum + subject.totalEntries, 0)}
                      </div>
                      <div className="text-sm font-medium text-teal-600">Documents</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                      <div className="text-3xl font-bold text-blue-700 mb-2">{subjectGroups.length}</div>
                      <div className="text-sm font-medium text-blue-600">Subject Areas</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                      <div className="text-3xl font-bold text-purple-700 mb-2">
                        {subjectGroups.reduce((sum, subject) => sum + subject.courses.length, 0)}
                      </div>
                      <div className="text-sm font-medium text-purple-600">Courses</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                      <div className="text-3xl font-bold text-green-700 mb-2">1.2k</div>
                      <div className="text-sm font-medium text-green-600">Downloads</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

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

