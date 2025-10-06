import React from 'react';
import { LucideProps } from 'lucide-react';

interface QuickAccessCardProps {
  icon: React.ElementType<LucideProps>;
  title: string;
  description: string;
  colorClass: string;
  onClick: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ icon: Icon, title, description, colorClass, onClick }) => (
  <div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 cursor-pointer">
    <Icon size={32} className={`${colorClass} mb-4`} />
    <h3 className="font-bold text-gray-900 dark:text-gray-50 text-lg mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </div>
);

export default QuickAccessCard;