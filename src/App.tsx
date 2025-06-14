import React, { useState, useCallback } from 'react';
import { Moon, Sun, Code, FileText, Palette } from 'lucide-react';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import CodePanel from './components/CodePanel';
import StatsPanel from './components/StatsPanel';
import ActionButtons from './components/ActionButtons';
import FileUpload from './components/FileUpload';
import { minifyCode } from './utils/minifier';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

type Language = 'javascript' | 'css' | 'html';

interface CodeState {
  original: string;
  minified: string;
  language: Language;
  error: string | null;
  stats: {
    originalSize: number;
    minifiedSize: number;
    compressionRatio: number;
    originalLines: number;
    minifiedLines: number;
  };
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  
  const [codeState, setCodeState] = useState<CodeState>({
    original: '',
    minified: '',
    language: 'javascript',
    error: null,
    stats: {
      originalSize: 0,
      minifiedSize: 0,
      compressionRatio: 0,
      originalLines: 0,
      minifiedLines: 0,
    },
  });

  const calculateStats = useCallback((original: string, minified: string) => {
    const originalSize = new Blob([original]).size;
    const minifiedSize = new Blob([minified]).size;
    const compressionRatio = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;
    const originalLines = original.split('\n').length;
    const minifiedLines = minified.split('\n').length;

    return {
      originalSize,
      minifiedSize,
      compressionRatio,
      originalLines,
      minifiedLines,
    };
  }, []);

  const handleCodeChange = useCallback(async (code: string) => {
    setCodeState(prev => ({ ...prev, original: code, error: null }));
    
    if (!code.trim()) {
      setCodeState(prev => ({
        ...prev,
        minified: '',
        stats: calculateStats('', ''),
      }));
      return;
    }

    try {
      const minified = await minifyCode(code, codeState.language);
      const stats = calculateStats(code, minified);
      
      setCodeState(prev => ({
        ...prev,
        minified,
        stats,
        error: null,
      }));
    } catch (error) {
      setCodeState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Minification failed',
        minified: '',
        stats: calculateStats(code, ''),
      }));
    }
  }, [codeState.language, calculateStats]);

  const handleLanguageChange = useCallback(async (language: Language) => {
    setCodeState(prev => ({ ...prev, language, error: null }));
    
    if (codeState.original.trim()) {
      try {
        const minified = await minifyCode(codeState.original, language);
        const stats = calculateStats(codeState.original, minified);
        
        setCodeState(prev => ({
          ...prev,
          language,
          minified,
          stats,
          error: null,
        }));
      } catch (error) {
        setCodeState(prev => ({
          ...prev,
          language,
          error: error instanceof Error ? error.message : 'Minification failed',
          minified: '',
          stats: calculateStats(codeState.original, ''),
        }));
      }
    }
  }, [codeState.original, calculateStats]);

  const handleFileUpload = useCallback((content: string, filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    let detectedLanguage: Language = 'javascript';
    
    switch (extension) {
      case 'css':
        detectedLanguage = 'css';
        break;
      case 'html':
      case 'htm':
        detectedLanguage = 'html';
        break;
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
      default:
        detectedLanguage = 'javascript';
        break;
    }
    
    setCodeState(prev => ({ ...prev, language: detectedLanguage }));
    handleCodeChange(content);
  }, [handleCodeChange]);

  const handleClear = useCallback(() => {
    setCodeState(prev => ({
      ...prev,
      original: '',
      minified: '',
      error: null,
      stats: calculateStats('', ''),
    }));
  }, [calculateStats]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, []);

  const handleDownload = useCallback((content: string, type: 'original' | 'minified') => {
    const fileExtension = codeState.language === 'javascript' ? 'js' : codeState.language;
    const filename = `code-${type}.${fileExtension}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [codeState.language]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <LanguageSelector
                language={codeState.language}
                onChange={handleLanguageChange}
                theme={theme}
              />
              <FileUpload onFileUpload={handleFileUpload} theme={theme} />
            </div>
          </div>
          <div>
            <StatsPanel stats={codeState.stats} theme={theme} />
          </div>
        </div>

        {codeState.error && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${
            theme === 'dark'
              ? 'bg-red-900/20 border-red-500 text-red-200'
              : 'bg-red-50 border-red-500 text-red-700'
          }`}>
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              <span className="font-medium">Minification Error:</span>
            </div>
            <p className="mt-1 text-sm">{codeState.error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <CodePanel
            title="Original Code"
            code={codeState.original}
            language={codeState.language}
            onChange={handleCodeChange}
            readOnly={false}
            theme={theme}
            lineCount={codeState.stats.originalLines}
          />
          <CodePanel
            title="Minified Code"
            code={codeState.minified}
            language={codeState.language}
            readOnly={true}
            theme={theme}
            lineCount={codeState.stats.minifiedLines}
          />
        </div>

        <ActionButtons
          originalCode={codeState.original}
          minifiedCode={codeState.minified}
          onClear={handleClear}
          onCopy={handleCopy}
          onDownload={handleDownload}
          theme={theme}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;