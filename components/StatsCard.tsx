
import React from 'react';
import Card from './ui/Card';

interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon }) => (
  <Card>
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-primary-100">
        <Icon className="w-6 h-6 text-primary-800" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </Card>
);

export default StatsCard;
