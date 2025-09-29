
import React from 'react';
import Card from './ui/Card';

interface DashboardCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'increase' | 'decrease';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, change, changeType }) => {
    return (
        <Card>
            <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-full text-primary-700">
                    {icon}
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-semibold text-gray-800">{value}</p>
                </div>
            </div>
            {change && (
                 <div className="mt-4 flex space-x-1 items-center text-sm">
                    <span className={`${changeType === 'increase' ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                        {change}
                    </span>
                    <span className="text-gray-500">vs last period</span>
                </div>
            )}
        </Card>
    );
};

export default DashboardCard;
