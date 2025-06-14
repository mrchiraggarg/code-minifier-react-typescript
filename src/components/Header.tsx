import React from 'react';
import { Moon, Sun, Code2, Zap } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-blue-600 to-purple-600'
              : 'bg-gradient-to-br from-blue-500 to-purple-600'
          } shadow-lg`}>
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Code Minifier Pro
            </h1>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Optimize your JavaScript, CSS, and HTML code instantly
            </p>
          </div>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-lg transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
              : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md'
          } hover:scale-105`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <div className="mt-6 flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <Zap className={`w-4 h-4 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`} />
          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Real-time minification
          </span>
        </div>
        <div className={`w-1 h-1 rounded-full ${
          theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
        }`} />
        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          Multiple language support
        </span>
        <div className={`w-1 h-1 rounded-full ${
          theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
        }`} />
        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          Drag & drop files
        </span>
      </div>
    </header>
  );
};

export default Header;