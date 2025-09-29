import React from 'react';
import { MapPin, Languages, Users } from 'lucide-react';

const Locator: React.FC = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Church Locator</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <MapPin size={16} className="inline mr-1" />Use My Location
            </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 h-96 flex items-center justify-center">
                <div className="text-center">
                    <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Interactive Map</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Showing Deeper Life churches worldwide</p>
                </div>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-50">45,000+ Churches Found</h3>
                        <p className="text-gray-600 dark:text-gray-400">Across 183 nations</p>
                    </div>
                    <div className="flex space-x-2">
                        <select className="border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg px-3 py-2 text-sm">
                            <option>Nearest First</option><option>By Service Time</option><option>By Language</option>
                        </select>
                        <input type="text" placeholder="Enter location..." className="border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-lg px-3 py-2 text-sm w-48" />
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Nearest Churches</h2>
            <div className="space-y-4">
                {[{ name: "DLBC Port Harcourt Main", address: "15 Aba Road, Port Harcourt, Rivers State", distance: "2.1 km", services: ["Sun 7AM", "Sun 4PM", "Wed 6PM", "Fri 6PM"], language: "English", capacity: 85 }, { name: "DLBC GRA Port Harcourt", address: "45 Forces Avenue, GRA, Port Harcourt", distance: "3.8 km", services: ["Sun 8AM", "Sun 5PM", "Wed 6:30PM"], language: "English", capacity: 92 }, { name: "DLBC Trans-Amadi", address: "12 Pipeline Road, Trans-Amadi, Port Harcourt", distance: "5.2 km", services: ["Sun 7:30AM", "Sun 4:30PM", "Wed 6PM"], language: "English", capacity: 67 }].map((church, i) => (
                    <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{church.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{church.address}</p>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap">
                                    <MapPin size={14} className="mr-1" />{church.distance}<span className="mx-2">•</span><Languages size={14} className="mr-1" />{church.language}<span className="mx-2">•</span><Users size={14} className="mr-1" />{church.capacity}% capacity
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {church.services.map((service, j) => (
                                        <span key={j} className={`bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full`}>{service}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 ml-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">Get Directions</button>
                                <button className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center"><div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">183</div><p className="text-gray-600 dark:text-gray-400">Countries</p></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center"><div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">45K+</div><p className="text-gray-600 dark:text-gray-400">Churches</p></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center"><div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1M+</div><p className="text-gray-600 dark:text-gray-400">Cell Groups</p></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center"><div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">50.2M</div><p className="text-gray-600 dark:text-gray-400">Members</p></div>
        </div>
    </div>
);

export default Locator;
