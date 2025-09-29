import React from 'react';
import { LucideProps } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavItemProps {
  icon: React.ElementType<LucideProps>;
  label: string;
  id: ActiveTab;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  badge?: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, id, activeTab, setActiveTab, badge }) => {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50'
      }`}
    >
      <Icon size={20} className="mr-3" />
      <span className="flex-1 text-left">{label}</span>
      {badge && <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{badge}</span>}
    </button>
  );
};

export default NavItem;
