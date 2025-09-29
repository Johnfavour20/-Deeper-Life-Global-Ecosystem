import React from 'react';
import { Star, Calendar, Globe } from 'lucide-react';
import { churchEvents } from '../constants';

const Events: React.FC = () => (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Upcoming Events</h1>
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <Star size={16} className="text-yellow-300" />
                        <span className="font-semibold text-sm">FEATURED GLOBAL EVENT</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-3">{churchEvents[0].title}</h2>
                    <div className="flex items-center space-x-4 text-indigo-200 mb-4">
                        <span className="flex items-center"><Calendar size={16} className="mr-2" /> {churchEvents[0].date}</span>
                        <span className="flex items-center"><Globe size={16} className="mr-2" /> {churchEvents[0].location}</span>
                    </div>
                    <p className="text-indigo-100 mb-6">Join millions of believers worldwide for a life-transforming encounter with God through the ministry of Pastor W.F. Kumuyi. Streaming live to all nations.</p>
                    <div className="flex items-center space-x-4">
                        <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-transform hover:scale-105">Join Live Stream</button>
                        <button className="border-2 border-white/50 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Learn More</button>
                    </div>
                </div>
                <div className="hidden md:block">
                    <Calendar size={120} className="opacity-20 transform rotate-12" />
                </div>
            </div>
        </div>

        <div className="flex flex-wrap gap-2">
            {['All', 'Global', 'Local', 'Youth', 'Ministry'].map(type => (
                <button key={type} className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50">{type}</button>
            ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Event Calendar</h3>
            <div className="space-y-4">
                {churchEvents.slice(1).map((event, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                            <div className="text-center w-20">
                                <p className="text-red-500 font-bold text-lg">{new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</p>
                                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{event.date.split(' ')[1].replace(',', '')}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-50">{event.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${event.type === 'Local' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'}`}>{event.type}</span>
                            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">Register</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Events;
