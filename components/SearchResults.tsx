'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getDocumentDownloadUrl } from '@/app/actions/download';
import type { SearchResult } from '@/lib/types';

interface SearchResultsProps {
  results: SearchResult[];
}

function ResultCard({ result }: { result: SearchResult }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await getDocumentDownloadUrl(result.id);
      if (response.error || !response.data) {
        toast.error(response.error ?? 'Could not start download.');
        return;
      }
      window.open(response.data, '_blank', 'noopener,noreferrer');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-2 bg-white rounded border border-gray-200 hover:border-teal-500 hover:bg-teal-50/50 transition-colors group">
      <h3 className="text-sm font-medium text-gray-900 truncate">{result.title}</h3>
      <p className="text-xs text-gray-500 mt-0.5 truncate">
        {result.module} {result.year ? `• ${result.year}` : ''}
      </p>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="mt-2 w-full flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs rounded bg-teal-50 text-teal-700 hover:bg-teal-100 disabled:opacity-60 transition-colors"
        title={`Download ${result.title}`}
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

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No documents found. Try a different search.
      </div>
    );
  }

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    const category = result.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="mt-6 space-y-6">
      {Object.entries(groupedResults).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {items.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
