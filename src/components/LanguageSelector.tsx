import React from 'react';
import { Code, Palette, FileText } from 'lucide-react';

type Language = 'javascript' | 'css' | 'html';

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
  theme: 'light' | 'dark';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange, theme }) => {
  const languages = [
    { value: 'javascript' as Language, label: 'JavaScript', icon: Code, color: 'yellow' },
    { value: 'css' as Language, label: 'CSS', icon: Palette, color: 'blue' },
    { value: 'html' as Language, label: 'HTML', icon: FileText, color: 'orange' },
  ];

  return (
    <div className={`p-4 rounded-xl border ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <label className={`block text-sm font-medium mb-3 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Select Language
      </label>
      <div className="flex space-x-2">
        {languages.map(({ value, label, icon: Icon, color }) => {
          const isSelected = language === value;
          return (
            <button
              key={value}
              onClick={() => onChange(value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isSelected
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-500 text-white shadow-lg'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } hover:scale-105`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelector;