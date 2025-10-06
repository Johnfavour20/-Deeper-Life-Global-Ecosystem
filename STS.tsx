import React from 'react';
import { Brain, BookOpen, Target, Award, Star } from 'lucide-react';
import { Badge } from '../types';
import { mockBadges } from '../data/mockData';

const ProgressCircle: React.FC<{ progress: number; label: string; icon: React.ElementType; color: string }> = ({ progress, label, icon: Icon, color }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        className={`text-${color}-600`}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className={`text-${color}-500`} size={24} />
                    <span className={`text-2xl font-bold text-gray-800 dark:text-gray-200`}>{progress}%</span>
                </div>
            </div>
            <p className="mt-2 font-semibold text-gray-700 dark:text-gray-300">{label}</p>
        </div>
    );
};

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => (
    <div className={`flex items-center gap-4 p-4 rounded-lg ${badge.unlocked ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50' : 'bg-gray-100 dark:bg-gray-700/50'}`}>
        <div className={`p-3 rounded-full ${badge.unlocked ? 'bg-yellow-400 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'}`}>
            <badge.icon size={24} />
        </div>
        <div>
            <h4 className={`font-bold ${badge.unlocked ? 'text-yellow-800 dark:text-yellow-300' : 'text-gray-600 dark:text-gray-400'}`}>{badge.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{badge.description}</p>
        </div>
    </div>
);

const STS: React.FC = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Search The Scriptures (STS)</h1>
            <div className="flex space-x-2">
                <select className="border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg px-3 py-2">
                    <option>Adult STS</option><option>Youth STS</option><option>Children's STS</option>
                </select>
            </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 via-secondary to-red-700 rounded-xl p-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Today's Study</h2>
                    <h3 className="text-xl mb-2">The Power of Prayer</h3>
                    <p className="text-red-200 mb-4">Scripture: James 5:16-18 | Topic: Effective Prayer Life</p>
                    <div className="bg-red-500/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">AI Summary:</h4>
                        <p className="text-sm text-red-100">Today's lesson explores the transformative power of righteous prayer, emphasizing how our connection with God can move mountains and bring healing to our communities.</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-3 ml-6">
                    <button className="bg-white text-secondary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"><BookOpen size={20} className="inline mr-2" />Read Full Lesson</button>
                    <button className="bg-red-500/80 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-500 transition-colors"><Brain size={20} className="inline mr-2" />AI Discussion</button>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
                <ProgressCircle progress={78} label="Current Streak" icon={Target} color="green" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">47 Days Completed</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
                <ProgressCircle progress={86} label="Weekly Goal" icon={Award} color="primary" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">6 of 7 Days</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
                <ProgressCircle progress={89} label="Annual Progress" icon={Star} color="purple" />
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Year to date</p>
            </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">My Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockBadges.map(badge => <BadgeCard key={badge.id} badge={badge} />)}
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Recent Lessons</h2><div className="space-y-4">{[{ title: "The Power of Prayer", date: "Today", scripture: "James 5:16-18", status: "current" }, { title: "Walking in Faith", date: "Yesterday", scripture: "Hebrews 11:1-6", status: "completed" }, { title: "Love in Action", date: "Dec 25", scripture: "1 John 4:7-21", status: "completed" }, { title: "The Good Shepherd", date: "Dec 24", scripture: "Psalm 23", status: "completed" }, { title: "Emmanuel With Us", date: "Dec 23", scripture: "Matthew 1:18-25", status: "completed" }].map((lesson, i) => (<div key={i} className={`border rounded-lg p-4 ${lesson.status === 'current' ? 'border-orange-300 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-700'}`}><div className="flex items-center justify-between"><div><h4 className="font-semibold text-gray-900 dark:text-gray-50">{lesson.title}</h4><p className="text-gray-600 dark:text-gray-400 text-sm">Scripture: {lesson.scripture}</p></div><div className="text-right"><p className="text-sm text-gray-500 dark:text-gray-400">{lesson.date}</p>{lesson.status === 'completed' && (<div className="text-green-600 text-sm flex items-center mt-1"><div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>Completed</div>)}{lesson.status === 'current' && (<div className="text-orange-600 text-sm flex items-center mt-1"><div className="w-2 h-2 bg-orange-600 rounded-full mr-2 animate-pulse"></div>In Progress</div>)}</div></div></div>))}</div></div>
    </div>
);

export default STS;