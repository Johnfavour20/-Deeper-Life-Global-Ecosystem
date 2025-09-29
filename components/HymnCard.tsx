import React from 'react';

interface HymnCardProps {
  number: string;
  title: string;
  keySignature: string;
  category: string;
}

const HymnCard: React.FC<HymnCardProps> = ({ number, title, keySignature, category }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex-shrink-0 flex items-center justify-center font-bold text-purple-700 dark:text-purple-300 text-lg">
        {number.replace('GHS ', '')}
      </div>
      <div className="flex-1 overflow-hidden">
        <h4 className="font-semibold text-gray-900 dark:text-gray-50 truncate">{title}</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{keySignature} • {category}</p>
      </div>
    </div>
  </div>
);

export default HymnCard;
