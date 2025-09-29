import React from 'react';
import { Brain, BookOpen, Target, Award, Star } from 'lucide-react';

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
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">Today's Study</h2>
                    <h3 className="text-xl mb-2">The Power of Prayer</h3>
                    <p className="text-orange-200 mb-4">Scripture: James 5:16-18 | Topic: Effective Prayer Life</p>
                    <div className="bg-orange-500/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">AI Summary:</h4>
                        <p className="text-sm text-orange-100">Today's lesson explores the transformative power of righteous prayer, emphasizing how our connection with God can move mountains and bring healing to our communities.</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-3 ml-6">
                    <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"><BookOpen size={20} className="inline mr-2" />Read Full Lesson</button>
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-400 transition-colors"><Brain size={20} className="inline mr-2" />AI Discussion</button>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-900 dark:text-gray-50">Current Streak</h3><Target className="text-green-600" size={24} /></div><div className="text-center"><div className="text-4xl font-bold text-green-600 mb-2">47</div><p className="text-gray-600 dark:text-gray-400">Days Completed</p><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4"><div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div></div></div></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-900 dark:text-gray-50">Weekly Goal</h3><Award className="text-blue-600" size={24} /></div><div className="text-center"><div className="text-4xl font-bold text-blue-600 mb-2">6/7</div><p className="text-gray-600 dark:text-gray-400">This Week</p><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '86%' }}></div></div></div></div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-900 dark:text-gray-50">Annual Progress</h3><Star className="text-purple-600" size={24} /></div><div className="text-center"><div className="text-4xl font-bold text-purple-600 mb-2">89%</div><p className="text-gray-600 dark:text-gray-400">Year Complete</p><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4"><div className="bg-purple-600 h-2 rounded-full" style={{ width: '89%' }}></div></div></div></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Recent Lessons</h2><div className="space-y-4">{[{ title: "The Power of Prayer", date: "Today", scripture: "James 5:16-18", status: "current" }, { title: "Walking in Faith", date: "Yesterday", scripture: "Hebrews 11:1-6", status: "completed" }, { title: "Love in Action", date: "Dec 25", scripture: "1 John 4:7-21", status: "completed" }, { title: "The Good Shepherd", date: "Dec 24", scripture: "Psalm 23", status: "completed" }, { title: "Emmanuel With Us", date: "Dec 23", scripture: "Matthew 1:18-25", status: "completed" }].map((lesson, i) => (<div key={i} className={`border rounded-lg p-4 ${lesson.status === 'current' ? 'border-orange-300 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-gray-700'}`}><div className="flex items-center justify-between"><div><h4 className="font-semibold text-gray-900 dark:text-gray-50">{lesson.title}</h4><p className="text-gray-600 dark:text-gray-400 text-sm">Scripture: {lesson.scripture}</p></div><div className="text-right"><p className="text-sm text-gray-500 dark:text-gray-400">{lesson.date}</p>{lesson.status === 'completed' && (<div className="text-green-600 text-sm flex items-center mt-1"><div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>Completed</div>)}{lesson.status === 'current' && (<div className="text-orange-600 text-sm flex items-center mt-1"><div className="w-2 h-2 bg-orange-600 rounded-full mr-2 animate-pulse"></div>In Progress</div>)}</div></div></div>))}</div></div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"><h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center"><Brain className="mr-2 text-blue-600" />AI Study Assistant</h2><div className="space-y-4"><div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"><p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Ask me anything about today's lesson:</p><input type="text" placeholder="e.g., 'How can I improve my prayer life?'" className="w-full border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-lg px-4 py-2" /></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><button className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 p-3 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors">Generate Discussion Questions</button><button className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 p-3 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900 transition-colors">Explain Difficult Verses</button><button className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 p-3 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">Find Related Scriptures</button></div></div></div>
    </div>
);

export default STS;
