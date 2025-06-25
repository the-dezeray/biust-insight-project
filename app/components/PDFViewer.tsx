import React, { useState, useRef, useEffect } from 'react';
import { Eye, ZoomIn, ZoomOut, X } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title = "Document Viewer" }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  // Construct PDF URL with parameters to disable download
  const getPdfViewerUrl = (url: string) => {
    if (!url) return '';
    
    // Extract the actual PDF URL from Google redirect URL if present
    const match = url.match(/url=([^&]+)/);
    const actualUrl = match ? decodeURIComponent(match[1]) : url;
    
    // For Google Drive PDFs, use preview mode
    if (actualUrl.includes('drive.google.com')) {
      return actualUrl.replace('/view', '/preview');
    }
    
    // For other PDFs, use a secure viewer with disabled features
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(actualUrl)}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&pagemode=none`;
  };

  // Additional security measures
  useEffect(() => {
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Prevent common keyboard shortcuts
      if ((e.ctrlKey || e.metaKey) && (
        e.key === 's' || // Save
        e.key === 'p' || // Print
        e.key === 'c' || // Copy
        e.key === 'a'    // Select all
      )) {
        e.preventDefault();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', preventKeyboardShortcuts);
    }

    return () => {
      if (container) {
        container.removeEventListener('keydown', preventKeyboardShortcuts);
      }
    };
  }, []);

  const viewerUrl = getPdfViewerUrl(pdfUrl);

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <Eye className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No PDF URL provided</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main PDF Viewer */}
      <div 
        ref={containerRef}
        className="relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        tabIndex={0}
      >
        {/* Header with controls */}
        <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 truncate flex-1">
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 min-w-[4rem] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2" />
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Fullscreen View"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PDF Container */}
        <div 
          className="relative"
          onContextMenu={handleContextMenu}
          style={{ height: '600px' }}
        >
          <iframe
            ref={iframeRef}
            src={viewerUrl}
            className="w-full h-full border-0"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
              width: `${10000 / zoom}%`,
              height: `${10000 / zoom}%`
            }}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            loading="lazy"
          />
          
          {/* Overlay to prevent easy access to PDF controls */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: 'transparent',
              userSelect: 'none'
            }}
          />
        </div>

        {/* Footer with security notice */}
        <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            🔒 Document viewing only - Download disabled for security
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl max-h-full">
            {/* Fullscreen Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-black bg-opacity-50">
              <h3 className="text-white text-lg font-semibold">
                {title}
              </h3>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 p-2 rounded-md transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Fullscreen PDF */}
            <div 
              className="w-full h-full pt-16"
              onContextMenu={handleContextMenu}
            >
              <iframe
                src={viewerUrl}
                className="w-full h-full border-0"
                title={title}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewer; 