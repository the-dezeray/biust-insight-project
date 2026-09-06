'use client';

import { useRef, useState } from 'react';
import { FileText, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { uploadDocument } from '@/app/actions/upload';

const SUPPORTED_FORMATS = ['PDF', 'DOC', 'DOCX', 'TXT', 'MD', 'PPT', 'PPTX'];

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [moduleCode, setModuleCode] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('exam');
  const [year, setYear] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const reset = () => {
    setFile(null);
    setModuleCode('');
    setTitle('');
    setCategory('exam');
    setYear('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please choose a file first.');
      return;
    }
    setIsUploading(true);

    try {
      const result = await uploadDocument({
        file,
        moduleCode,
        title: title || file.name.replace(/\.[^.]+$/, ''),
        category,
        year: year || undefined,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Document uploaded successfully.');
      reset();
      onOpenChange(false);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!isUploading) onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-teal-700 text-xl flex items-center gap-2">
            <Upload size={20} />
            Upload Documents
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-300 ${
              file ? 'border-teal-500 bg-teal-50/50' : 'border-teal-300 hover:border-teal-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.md,.ppt,.pptx"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center">
                <FileText size={28} className="text-teal-600" />
              </div>
              {file ? (
                <>
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[260px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB - click to change
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base font-medium text-gray-700">
                    Drag & drop your files here
                  </p>
                  <p className="text-sm text-gray-500">Or click to browse files</p>
                </>
              )}
            </div>
          </div>

          {/* Metadata fields */}
          <div className="space-y-3">
            <div>
              <label htmlFor="upload-module" className="block text-sm font-medium text-gray-700 mb-1">
                Module Code
              </label>
              <input
                id="upload-module"
                type="text"
                value={moduleCode}
                onChange={(e) => setModuleCode(e.target.value.toUpperCase())}
                placeholder="e.g. ALSS 101"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="upload-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  id="upload-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="2019 Exam"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="upload-year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  id="upload-year"
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2025"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="upload-category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="upload-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all capitalize"
              >
                {['exam', 'test', 'quiz', 'supplementary', 'special', 'notes', 'assignment'].map(
                  (option) => (
                    <option key={option} value={option} className="capitalize">
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Supported formats:</h4>
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_FORMATS.map((format) => (
                <span
                  key={format}
                  className="px-2 py-1 bg-white text-xs text-gray-600 rounded border"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onOpenChange(false)}
              disabled={isUploading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-60 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !file}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-60 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {isUploading && <Loader2 size={16} className="animate-spin" />}
              Upload
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
