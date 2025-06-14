import React from 'react';
import { Copy, FileText } from 'lucide-react';

type Language = 'javascript' | 'css' | 'html';

interface CodePanelProps {
  title: string;
  code: string;
  language: Language;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  theme: 'light' | 'dark';
  lineCount: number;
}

const CodePanel: React.FC<CodePanelProps> = ({
  title,
  code,
  language,
  onChange,
  readOnly = false,
  theme,
  lineCount,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div className={`rounded-xl border ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    } overflow-hidden`}>
      <div className={`px-4 py-3 border-b ${
        theme === 'dark'
          ? 'bg-gray-750 border-gray-700'
          : 'bg-gray-50 border-gray-200'
      } flex items-center justify-between`}>
        <div className="flex items-center space-x-2">
          <FileText className={`w-4 h-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`} />
          <h3 className={`font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded ${
            theme === 'dark'
              ? 'bg-gray-600 text-gray-300'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {lineCount} lines
          </span>
        </div>
        {code && (
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-md transition-colors ${
              theme === 'dark'
                ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200'
                : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
            }`}
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={readOnly ? "Minified code will appear here..." : `Paste your ${language} code here...`}
          className={`w-full h-80 p-4 font-mono text-sm resize-none focus:outline-none ${
            theme === 'dark'
              ? 'bg-gray-800 text-gray-200 placeholder-gray-500'
              : 'bg-white text-gray-800 placeholder-gray-400'
          } ${readOnly ? 'cursor-default' : 'focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'}`}
          style={{ fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}
        />
        {code && (
          <div className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-400'
              : 'bg-gray-100 text-gray-500'
          }`}>
            {new Blob([code]).size} bytes
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePanel;