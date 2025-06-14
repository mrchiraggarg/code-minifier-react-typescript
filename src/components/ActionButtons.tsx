import React from 'react';
import { Copy, Download, Trash2, CheckCircle } from 'lucide-react';

interface ActionButtonsProps {
  originalCode: string;
  minifiedCode: string;
  onClear: () => void;
  onCopy: (text: string) => Promise<void>;
  onDownload: (content: string, type: 'original' | 'minified') => void;
  theme: 'light' | 'dark';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  originalCode,
  minifiedCode,
  onClear,
  onCopy,
  onDownload,
  theme,
}) => {
  const [copiedState, setCopiedState] = React.useState<'original' | 'minified' | null>(null);

  const handleCopy = async (text: string, type: 'original' | 'minified') => {
    await onCopy(text);
    setCopiedState(type);
    setTimeout(() => setCopiedState(null), 2000);
  };

  const buttonBaseClass = `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105`;
  
  const primaryButtonClass = theme === 'dark'
    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg';
    
  const secondaryButtonClass = theme === 'dark'
    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm';
    
  const dangerButtonClass = theme === 'dark'
    ? 'bg-red-900 hover:bg-red-800 text-red-200 border border-red-700'
    : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200';

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* Copy Original */}
      <button
        onClick={() => handleCopy(originalCode, 'original')}
        disabled={!originalCode}
        className={`${buttonBaseClass} ${
          originalCode ? secondaryButtonClass : 
          theme === 'dark' ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {copiedState === 'original' ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        <span>{copiedState === 'original' ? 'Copied!' : 'Copy Original'}</span>
      </button>

      {/* Copy Minified */}
      <button
        onClick={() => handleCopy(minifiedCode, 'minified')}
        disabled={!minifiedCode}
        className={`${buttonBaseClass} ${
          minifiedCode ? primaryButtonClass : 
          theme === 'dark' ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {copiedState === 'minified' ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        <span>{copiedState === 'minified' ? 'Copied!' : 'Copy Minified'}</span>
      </button>

      {/* Download Original */}
      <button
        onClick={() => onDownload(originalCode, 'original')}
        disabled={!originalCode}
        className={`${buttonBaseClass} ${
          originalCode ? secondaryButtonClass : 
          theme === 'dark' ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Download className="w-4 h-4" />
        <span>Download Original</span>
      </button>

      {/* Download Minified */}
      <button
        onClick={() => onDownload(minifiedCode, 'minified')}
        disabled={!minifiedCode}
        className={`${buttonBaseClass} ${
          minifiedCode ? primaryButtonClass : 
          theme === 'dark' ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Download className="w-4 h-4" />
        <span>Download Minified</span>
      </button>

      {/* Clear */}
      <button
        onClick={onClear}
        disabled={!originalCode && !minifiedCode}
        className={`${buttonBaseClass} ${
          (originalCode || minifiedCode) ? dangerButtonClass : 
          theme === 'dark' ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Trash2 className="w-4 h-4" />
        <span>Clear All</span>
      </button>
    </div>
  );
};

export default ActionButtons;