import React from 'react';
import { LucideProps, TrendingUp } from 'lucide-react';

interface StatCardProps {
    icon: React.ElementType<LucideProps>;
    title: string;
    value: string;
    trend?: string;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, trend, color = "primary" }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
                <p className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400 mt-1`}>{value}</p>
                {trend && (
                    <p className="text-green-500 text-sm mt-1 flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        {trend}
                    </p>
                )}
            </div>
            <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/50`}>
                <Icon size={24} className={`text-${color}-600 dark:text-${color}-300`} />
            </div>
        </div>
    </div>
);

export default StatCard;