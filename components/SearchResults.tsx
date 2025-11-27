'use client';

interface Document {
  id: number;
  module: string;
  title: string;
  category: string;
  year: string;
  link: string;
}

interface SearchResultsProps {
  results: Document[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
     --
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {results.map((result) => (
        <a
          key={result.id}
          href={result.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {result.module} • {result.category} {result.year ? `• ${result.year}` : ''}
              </p>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800">
              {result.category}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
} 
