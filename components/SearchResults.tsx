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

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    const category = result.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div className="mt-6 space-y-6">
      {Object.entries(groupedResults).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {items.map((result) => (
              <a
                key={result.id}
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 bg-white rounded border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-colors"
              >
                <h3 className="text-sm font-medium text-gray-900 truncate">{result.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {result.module} {result.year ? `• ${result.year}` : ''}
                </p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 
