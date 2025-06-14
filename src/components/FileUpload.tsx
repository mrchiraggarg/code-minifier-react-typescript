import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (content: string, filename: string) => void;
  theme: 'light' | 'dark';
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, theme }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileRead = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content, file.name);
      setUploadedFile(file.name);
    };
    reader.readAsText(file);
  }, [onFileUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type.includes('text') || file.name.match(/\.(js|css|html|htm|jsx|ts|tsx)$/))) {
      handleFileRead(file);
    }
  }, [handleFileRead]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  }, [handleFileRead]);

  const clearUploadedFile = useCallback(() => {
    setUploadedFile(null);
  }, []);

  return (
    <div className={`p-4 rounded-xl border-2 border-dashed transition-all duration-200 ${
      isDragOver
        ? theme === 'dark'
          ? 'border-blue-500 bg-blue-900/20'
          : 'border-blue-500 bg-blue-50'
        : theme === 'dark'
          ? 'border-gray-600 bg-gray-800'
          : 'border-gray-300 bg-white'
    }`}>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        className="text-center"
      >
        {uploadedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <File className={`w-5 h-5 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`} />
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {uploadedFile}
              </span>
            </div>
            <button
              onClick={clearUploadedFile}
              className={`p-1 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-red-900/20 text-red-400'
                  : 'hover:bg-red-50 text-red-500'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className={`w-8 h-8 mx-auto mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <p className={`text-sm font-medium mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Drop your code file here
            </p>
            <p className={`text-xs mb-3 ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Supports .js, .css, .html, .jsx, .ts, .tsx files
            </p>
            <label className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Choose File</span>
              <input
                type="file"
                accept=".js,.css,.html,.htm,.jsx,.ts,.tsx"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;