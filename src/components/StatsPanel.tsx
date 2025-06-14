import React from 'react';
import { BarChart3, TrendingDown, FileText, Hash } from 'lucide-react';

interface StatsProps {
  originalSize: number;
  minifiedSize: number;
  compressionRatio: number;
  originalLines: number;
  minifiedLines: number;
}

interface StatsPanelProps {
  stats: StatsProps;
  theme: 'light' | 'dark';
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, theme }) => {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  const statItems = [
    {
      icon: FileText,
      label: 'Original Size',
      value: formatBytes(stats.originalSize),
      color: 'blue',
    },
    {
      icon: TrendingDown,
      label: 'Minified Size',
      value: formatBytes(stats.minifiedSize),
      color: 'green',
    },
    {
      icon: BarChart3,
      label: 'Compression',
      value: `${stats.compressionRatio.toFixed(1)}%`,
      color: 'purple',
    },
    {
      icon: Hash,
      label: 'Lines Saved',
      value: `${stats.originalLines - stats.minifiedLines}`,
      color: 'orange',
    },
  ];

  return (
    <div className={`p-6 rounded-xl border ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Compression Statistics
      </h3>
      
      <div className="space-y-4">
        {statItems.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                color === 'blue' 
                  ? theme === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'
                  : color === 'green'
                  ? theme === 'dark' ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-600'
                  : color === 'purple'
                  ? theme === 'dark' ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-600'
                  : theme === 'dark' ? 'bg-orange-900/50 text-orange-400' : 'bg-orange-100 text-orange-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {label}
              </span>
            </div>
            <span className={`font-semibold ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {stats.compressionRatio > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`text-center p-3 rounded-lg ${
            stats.compressionRatio > 50
              ? theme === 'dark' ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-700'
              : stats.compressionRatio > 25
              ? theme === 'dark' ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-700'
              : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className="text-sm font-medium">
              {stats.compressionRatio > 50 
                ? '🎉 Excellent compression!' 
                : stats.compressionRatio > 25
                ? '✨ Good compression'
                : '📝 Basic optimization'}
            </div>
            <div className="text-xs mt-1 opacity-80">
              Saved {formatBytes(stats.originalSize - stats.minifiedSize)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;