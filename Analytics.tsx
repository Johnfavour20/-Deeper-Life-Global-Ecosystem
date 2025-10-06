import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { rolePrivilegeLevels } from '../constants';
import { Lock, Users, TrendingUp, MapPin, Heart } from 'lucide-react';
import StatCard from '../components/StatCard';
import { analyticsData } from '../constants';

const Analytics: React.FC = () => {
    const { userRole } = useAuth();

    if (rolePrivilegeLevels[userRole] < rolePrivilegeLevels['group_pastor']) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Lock size={48} className="text-secondary mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Access Denied</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">You do not have sufficient privileges to view this page. <br />Please contact your administrator for access.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Global Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} title="Total Members" value="50.2M" trend="+1.2M this year" color="primary" />
                <StatCard icon={TrendingUp} title="Growth Rate" value="2.4%" trend="+0.1% vs last month" color="green" />
                <StatCard icon={MapPin} title="Online Engagement" value="7.8M" trend="+12% weekly" color="purple" />
                <StatCard icon={Heart} title="New Conversions (YTD)" value="850K" color="red" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Membership Growth (in Millions)</h3>
                    <div className="w-full h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-end p-4 space-x-2">
                        {analyticsData.membershipGrowth.map((val, i) => (
                            <div key={i} className="flex-1 bg-primary-500 rounded-t-md hover:bg-primary-400 transition-colors" style={{ height: `${(val / Math.max(...analyticsData.membershipGrowth)) * 100}%` }}></div>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Member Demographics</h3>
                    <div className="w-full h-64 flex items-center justify-center">
                        <div className="relative w-48 h-48 rounded-full" style={{ background: `conic-gradient(from 0deg, #4680C2 0% ${analyticsData.memberDemographics.data[0]}%, #10B981 ${analyticsData.memberDemographics.data[0]}% ${analyticsData.memberDemographics.data[0] + analyticsData.memberDemographics.data[1]}%, #F97316 ${analyticsData.memberDemographics.data[0] + analyticsData.memberDemographics.data[1]}% 100%)` }}>
                            <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4 text-sm">
                        <span className="flex items-center"><div className="w-3 h-3 bg-primary-500 rounded-sm mr-2"></div>Youth</span>
                        <span className="flex items-center"><div className="w-3 h-3 bg-[#10B981] rounded-sm mr-2"></div>Adult</span>
                        <span className="flex items-center"><div className="w-3 h-3 bg-[#F97316] rounded-sm mr-2"></div>Elder</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-4">Attendance by Region (%)</h3>
                <div className="space-y-3">
                    {analyticsData.attendanceByRegion.labels.map((label, i) => (
                        <div key={label}>
                            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <span>{label}</span>
                                <span>{analyticsData.attendanceByRegion.data[i]}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${analyticsData.attendanceByRegion.data[i]}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;