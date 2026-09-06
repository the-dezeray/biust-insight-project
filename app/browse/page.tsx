'use client';

import { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Grid3x3, FileText, Calculator, Atom, FlaskConical, Binary, TrendingUp, Folder, BookOpen, Cpu, Zap, Earth, Download, Loader2 } from 'lucide-react';
import { useSubjectData } from '@/hooks/useSubjectData';
import { getCourseDocuments } from '@/app/actions/catalog';
import { getDocumentDownloadUrl } from '@/app/actions/download';
import { AppSidebar } from '@/components/AppSidebar';
import { UploadModal } from '@/components/UploadModal';
import type { CourseDocument } from '@/lib/types';

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

function DocumentRow({ doc }: { doc: CourseDocument }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const result = await getDocumentDownloadUrl(doc.id);
      if (result.error || !result.data) return;
      window.open(result.data, '_blank', 'noopener,noreferrer');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-3 hover:border-teal-300 transition-colors">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
        <p className="text-xs text-gray-500 capitalize">
          {doc.category} {doc.year ? `• ${doc.year}` : ''}
        </p>
      </div>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="ml-3 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-teal-50 text-teal-700 hover:bg-teal-100 disabled:opacity-60 transition-colors shrink-0"
      >
        {isDownloading ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <Download size={13} />
        )}
        Download
      </button>
    </div>
  );
}

export default function BrowsePage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { subjectGroups, isLoading, error } = useSubjectData();
  const [documents, setDocuments] = useState<CourseDocument[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docsError, setDocsError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCourse) {
      setDocuments([]);
      setDocsError(null);
      return;
    }
    let cancelled = false;
    setDocsLoading(true);
    setDocsError(null);

    getCourseDocuments(selectedCourse).then((result) => {
      if (cancelled) return;
      setDocsLoading(false);
      if (result.error) {
        setDocsError(result.error);
        setDocuments([]);
      } else {
        setDocuments(result.data ?? []);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedCourse]);
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

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600 text-center">
                  {error}
                </div>
              )}

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
                            {documents.length} document{documents.length !== 1 ? 's' : ''}
                          </span>
                        </div>

                        {docsLoading ? (
                          <div className="flex items-center justify-center gap-2 py-8 text-gray-500">
                            <Loader2 size={18} className="animate-spin" />
                            Loading documents...
                          </div>
                        ) : docsError ? (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
                            {docsError}
                          </div>
                        ) : documents.length === 0 ? (
                          <p className="text-gray-600">No documents uploaded for this course yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {documents.map((doc) => (
                              <DocumentRow key={doc.id} doc={doc} />
                            ))}
                          </div>
                        )}
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
        <UploadModal open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen} />
      </div>
    </SidebarProvider>
  );
}

