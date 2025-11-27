"use client";
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Simple icon components to replace lucide-react
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const Maximize2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const Minimize2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
  </svg>
);

const Brain = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Dynamic import for PDF.js to avoid SSR issues
let pdfjsLib: any = null;

interface SearchResult {
    pageNumber: number;
    text: string;
    matchIndex: number;
}

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

const Page = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdfDoc, setPdfDoc] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // New state for enhanced features
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
    const [isSearching, setIsSearching] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [generatedQuiz, setGeneratedQuiz] = useState<QuizQuestion[]>([]);
    const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
    const [pdfText, setPdfText] = useState<string>('');
    const [scale, setScale] = useState(1.5);

    const pdfUrl ="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf?utm_source=chatgpt.com";

    useEffect(() => {
        // Dynamic import PDF.js only on client side
        const initPDFJS = async () => {
            try {
                const pdfjs = await import('pdfjs-dist');
                pdfjsLib = pdfjs;
                // Set the worker source
                pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
                loadPDF();
            } catch (err) {
                console.error('Failed to load PDF.js:', err);
                setError('Failed to initialize PDF viewer. Please refresh the page.');
                setLoading(false);
            }
        };
        
        initPDFJS();
    }, []);

    const loadPDF = async () => {
        if (!pdfjsLib) {
            setError('PDF.js not initialized');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            
            setPdfDoc(pdf);
            setTotalPages(pdf.numPages);
            
            // Extract text from all pages for search functionality
            await extractAllText(pdf);
            
            renderPage(pdf, 1);
        } catch (err) {
            console.error('Error loading PDF:', err);
            setError('Failed to load PDF. Please check your internet connection.');
        } finally {
            setLoading(false);
        }
    };

    const extractAllText = async (pdf: any) => {
        let allText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            try {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items.map((item: any) => item.str).join(' ');
                allText += `Page ${i}: ${pageText}\n\n`;
            } catch (err) {
                console.error(`Error extracting text from page ${i}:`, err);
            }
        }
        setPdfText(allText);
    };

    const renderPage = async (pdf: any, pageNumber: number) => {
        try {
            const page = await pdf.getPage(pageNumber);
            const canvas = canvasRef.current;
            
            if (!canvas) return;
            
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale });
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            setCurrentPage(pageNumber);
        } catch (err) {
            console.error('Error rendering page:', err);
            setError('Failed to render PDF page.');
        }
    };

    const goToPrevPage = () => {
        if (pdfDoc && currentPage > 1) {
            renderPage(pdfDoc, currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (pdfDoc && currentPage < totalPages) {
            renderPage(pdfDoc, currentPage + 1);
        }
    };

    // Search functionality
    const performSearch = async () => {
        if (!searchQuery.trim() || !pdfDoc) return;
        
        setIsSearching(true);
        const results: SearchResult[] = [];
        
        try {
            for (let i = 1; i <= totalPages; i++) {
                const page = await pdfDoc.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items.map((item: any) => item.str).join(' ');
                
                const regex = new RegExp(searchQuery.trim(), 'gi');
                let match;
                let matchIndex = 0;
                
                while ((match = regex.exec(pageText)) !== null) {
                    results.push({
                        pageNumber: i,
                        text: pageText.substring(Math.max(0, match.index - 50), match.index + 50),
                        matchIndex: matchIndex++
                    });
                }
            }
        } catch (err) {
            console.error('Search error:', err);
        }
        
        setSearchResults(results);
        setCurrentSearchIndex(results.length > 0 ? 0 : -1);
        setIsSearching(false);
        
        if (results.length > 0) {
            renderPage(pdfDoc, results[0].pageNumber);
        }
    };

    const goToSearchResult = (index: number) => {
        if (index >= 0 && index < searchResults.length) {
            setCurrentSearchIndex(index);
            renderPage(pdfDoc, searchResults[index].pageNumber);
        }
    };

    // Fullscreen functionality
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // Zoom functionality
    const zoomIn = () => {
        const newScale = scale + 0.25;
        setScale(newScale);
        if (pdfDoc) {
            renderPage(pdfDoc, currentPage);
        }
    };

    const zoomOut = () => {
        const newScale = Math.max(0.5, scale - 0.25);
        setScale(newScale);
        if (pdfDoc) {
            renderPage(pdfDoc, currentPage);
        }
    };

    // Quiz generation functionality
    const generateQuiz = async () => {
        if (!pdfText.trim()) return;
        
        setIsGeneratingQuiz(true);
        
        // Simple quiz generation based on text content
        // In a real app, you'd use AI/ML services for better quiz generation
        const sampleQuestions: QuizQuestion[] = [
            {
                question: "What is the main topic discussed in this document?",
                options: ["Research Methods", "Data Analysis", "Statistical Testing", "General Information"],
                correctAnswer: 3
            },
            {
                question: "Based on the content, which aspect is most emphasized?",
                options: ["Theoretical Framework", "Practical Applications", "Historical Context", "Future Implications"],
                correctAnswer: 1
            },
            {
                question: "What type of document does this appear to be?",
                options: ["Academic Paper", "Technical Manual", "Sample Document", "Research Report"],
                correctAnswer: 2
            }
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setGeneratedQuiz(sampleQuestions);
        setIsGeneratingQuiz(false);
        setShowQuizModal(true);
    };

    return (
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'min-h-screen bg-gray-50'} ${isFullscreen ? 'p-4' : 'p-8'}`}>
            <div className={`${isFullscreen ? 'h-full' : 'max-w-4xl'} mx-auto`}>
                {!isFullscreen && (
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Enhanced PDF Viewer
                    </h1>
                )}
                
                {loading && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading PDF...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                        <Button onClick={loadPDF} variant="destructive" className="mt-2">
                            Retry
                        </Button>
                    </div>
                )}

                {!loading && !error && (
                    <div className={`bg-white rounded-lg shadow-lg ${isFullscreen ? 'h-full' : 'p-6'} ${isFullscreen ? 'p-4' : ''}`}>
                        {/* Enhanced Toolbar */}
                        <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b gap-4">
                            {/* Navigation Controls */}
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={goToPrevPage}
                                    disabled={currentPage <= 1}
                                    variant="outline"
                                    size="sm"
                                >
                                    Previous
                                </Button>
                                
                                <span className="font-medium text-gray-700 px-3">
                                    Page {currentPage} of {totalPages}
                                </span>
                                
                                <Button
                                    onClick={goToNextPage}
                                    disabled={currentPage >= totalPages}
                                    variant="outline"
                                    size="sm"
                                >
                                    Next
                                </Button>
                            </div>

                            {/* Search Bar */}
                            <div className="flex items-center gap-2 flex-1 max-w-md">
                                <div className="relative flex-1">
                                    <Input
                                        placeholder="Search in PDF..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && performSearch()}
                                        className="pr-10"
                                    />
                                    <Button
                                        onClick={performSearch}
                                        disabled={isSearching || !searchQuery.trim()}
                                        size="sm"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                                    >
                                        <Search className="h-3 w-3" />
                                    </Button>
                                </div>
                                
                                {searchResults.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Button
                                            onClick={() => goToSearchResult(currentSearchIndex - 1)}
                                            disabled={currentSearchIndex <= 0}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <ChevronUp className="h-3 w-3" />
                                        </Button>
                                        <span className="text-xs text-gray-600 px-2">
                                            {currentSearchIndex + 1}/{searchResults.length}
                                        </span>
                                        <Button
                                            onClick={() => goToSearchResult(currentSearchIndex + 1)}
                                            disabled={currentSearchIndex >= searchResults.length - 1}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <ChevronDown className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                {/* Zoom Controls */}
                                <Button onClick={zoomOut} size="sm" variant="outline">
                                    -
                                </Button>
                                <span className="text-sm text-gray-600 px-2">
                                    {Math.round(scale * 100)}%
                                </span>
                                <Button onClick={zoomIn} size="sm" variant="outline">
                                    +
                                </Button>

                                {/* Generate Quiz Button */}
                                <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={generateQuiz}
                                            disabled={isGeneratingQuiz}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <Brain className="h-4 w-4 mr-1" />
                                            {isGeneratingQuiz ? 'Generating...' : 'Quiz'}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Generated Quiz</DialogTitle>
                                            <DialogDescription>
                                                Test your understanding of the document content
                                            </DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="space-y-6">
                                            {generatedQuiz.map((question, index) => (
                                                <div key={index} className="space-y-3">
                                                    <h3 className="font-medium">
                                                        {index + 1}. {question.question}
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {question.options.map((option, optionIndex) => (
                                                            <label
                                                                key={optionIndex}
                                                                className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`question-${index}`}
                                                                    value={optionIndex}
                                                                    className="text-blue-600"
                                                                />
                                                                <span>{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <DialogFooter>
                                            <Button onClick={() => setShowQuizModal(false)}>
                                                Close
                                            </Button>
                                            <Button variant="default">
                                                Submit Quiz
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                {/* Fullscreen Toggle */}
                                <Button
                                    onClick={toggleFullscreen}
                                    size="sm"
                                    variant="outline"
                                >
                                    {isFullscreen ? (
                                        <Minimize2 className="h-4 w-4" />
                                    ) : (
                                        <Maximize2 className="h-4 w-4" />
                                    )}
                                </Button>

                                {isFullscreen && (
                                    <Button
                                        onClick={() => setIsFullscreen(false)}
                                        size="sm"
                                        variant="outline"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Search Results Panel */}
                        {searchResults.length > 0 && (
                            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-yellow-800">
                                        Found {searchResults.length} results for "{searchQuery}"
                                    </span>
                                    <Button
                                        onClick={() => {
                                            setSearchResults([]);
                                            setCurrentSearchIndex(-1);
                                        }}
                                        size="sm"
                                        variant="ghost"
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                                {currentSearchIndex >= 0 && (
                                    <p className="text-xs text-yellow-700">
                                        Page {searchResults[currentSearchIndex].pageNumber}: ...{searchResults[currentSearchIndex].text}...
                                    </p>
                                )}
                            </div>
                        )}

                        {/* PDF Canvas */}
                        <div className={`flex justify-center ${isFullscreen ? 'h-full overflow-auto' : ''}`}>
                            <canvas 
                                ref={canvasRef}
                                className="border border-gray-300 shadow-sm"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                )}

                {/* PDF Info - Hidden in fullscreen */}
                {!isFullscreen && !loading && !error && (
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>Enhanced PDF Viewer with Search, Quiz Generation & Fullscreen</p>
                        <p className="break-all text-xs">{pdfUrl}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;