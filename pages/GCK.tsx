import React, { useState } from 'react';
import { Play, Calendar, Users, Mic, Download, FileText, HandHeart, Heart, MessageSquare, Share2 } from 'lucide-react';
// FIX: Corrected import paths for mock data.
import { mockGCKEventInfo } from '../data/mockData';
import { mockGCKSchedule, mockGCKTestimonies } from '../data/kumuyiMessagesData';
import { GCKEvent, GCKScheduleItem, GCKTestimony, ActiveTab } from '../types';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { useNotification } from '../hooks/useNotification';

type GCKTab = 'schedule' | 'testimonies' | 'resources';

interface GCKProps {
    setActiveTab: (tab: ActiveTab) => void;
}

const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-3 text-sm font-bold transition-colors duration-200 focus:outline-none ${
            isActive
                ? 'border-b-4 border-red-600 text-red-600 dark:border-red-400 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
        }`}
    >
        {label}
    </button>
);

const TestimonyModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { showToast } = useNotification();
    const handleSubmit = () => {
        showToast("Thank you for sharing your testimony!", "success");
        onClose();
    };
    return (
        <Modal show={isOpen} onClose={onClose} title="Share Your Testimony">
            <div className="space-y-4">
                <textarea
                    className="w-full border-gray-300 dark:border-gray-600 rounded-lg p-3 text-base bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-red-500"
                    placeholder="Describe what the Lord has done for you..."
                    rows={6}
                ></textarea>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleSubmit}>Share Testimony</Button>
            </div>
        </Modal>
    );
};

const PrayerRequestModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { showToast } = useNotification();
    const handleSubmit = () => {
        showToast("Your prayer request has been submitted.", "success");
        onClose();
    };
    return (
        <Modal show={isOpen} onClose={onClose} title="Submit Prayer Request">
            <div className="space-y-4">
                <textarea
                    className="w-full border-gray-300 dark:border-gray-600 rounded-lg p-3 text-base bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-red-500"
                    placeholder="What should we pray with you about?"
                    rows={5}
                ></textarea>
                <div className="flex items-center">
                    <input id="anonymous-gck" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    <label htmlFor="anonymous-gck" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Post anonymously</label>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleSubmit}>Submit Request</Button>
            </div>
        </Modal>
    );
};


const GCK: React.FC<GCKProps> = ({ setActiveTab }) => {
    const eventInfo = mockGCKEventInfo;
    const [activeTabContent, setActiveTabContent] = useState<GCKTab>('schedule');
    const [isTestimonyModalOpen, setTestimonyModalOpen] = useState(false);
    const [isPrayerModalOpen, setPrayerModalOpen] = useState(false);

    const renderTabContent = () => {
        switch (activeTabContent) {
            case 'schedule':
                return (
                    <div className="space-y-3">
                        {mockGCKSchedule.map(item => (
                            <div key={item.day} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="text-center w-16">
                                    <p className="font-bold text-red-600 dark:text-red-400">{item.day}</p>
                                    <p className="text-sm">{item.date}</p>
                                </div>
                                <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
                                    <p className="font-semibold">{item.topic}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'testimonies':
                return (
                     <div className="space-y-4">
                        {mockGCKTestimonies.map(testimony => (
                            <div key={testimony.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                                <div className="flex items-start space-x-3">
                                    <img src={testimony.avatar} alt={testimony.author} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-bold">{testimony.author}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{testimony.location}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">{testimony.testimony}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'resources':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Download className="h-6 w-6 text-red-600" />
                            <div>
                                <p className="font-semibold">Download Crusade Flyer</p>
                                <p className="text-xs text-gray-500">Share with friends and family</p>
                            </div>
                        </a>
                        <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FileText className="h-6 w-6 text-red-600" />
                            <div>
                                <p className="font-semibold">Crusade Program</p>
                                <p className="text-xs text-gray-500">View the full event program</p>
                            </div>
                        </a>
                         <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Play className="h-6 w-6 text-red-600" />
                            <div>
                                <p className="font-semibold">Watch Past Crusades</p>
                                <p className="text-xs text-gray-500">Visit our media library</p>
                            </div>
                        </a>
                         <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Users className="h-6 w-6 text-red-600" />
                            <div>
                                <p className="font-semibold">Join a Believers' Group</p>
                                <p className="text-xs text-gray-500">Connect with others online</p>
                            </div>
                        </a>
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="space-y-6">
            <TestimonyModal isOpen={isTestimonyModalOpen} onClose={() => setTestimonyModalOpen(false)} />
            <PrayerRequestModal isOpen={isPrayerModalOpen} onClose={() => setPrayerModalOpen(false)} />

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black group shadow-2xl">
                <img src={eventInfo.posterUrl} alt={eventInfo.theme} className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                     {eventInfo.isLive && (
                        <div className="mb-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md flex items-center gap-2 animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            BROADCAST IS LIVE
                        </div>
                    )}
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">{eventInfo.theme}</h1>
                    <p className="text-lg font-semibold mt-2 drop-shadow-md">{eventInfo.title}</p>
                    <Button onClick={() => setActiveTab('live')} size="lg" className="mt-8 bg-white text-gray-900 hover:bg-gray-200">
                        <Play size={20} className="mr-2" /> Watch Live Now
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {eventInfo.date}</span>
                            <span className="flex items-center gap-1.5"><Mic size={14} /> {eventInfo.minister}</span>
                        </div>
                    </div>
                     <div className="flex flex-wrap gap-2">
                        <Button onClick={() => setTestimonyModalOpen(true)} variant="ghost" size="sm" className="!bg-green-100 dark:!bg-green-900/50 hover:!bg-green-200 text-green-700 dark:text-green-300">
                            <Heart size={16} className="mr-2"/> Share Testimony
                        </Button>
                         <Button onClick={() => setPrayerModalOpen(true)} variant="ghost" size="sm" className="!bg-blue-100 dark:!bg-blue-900/50 hover:!bg-blue-200 text-blue-700 dark:text-blue-300">
                            <HandHeart size={16} className="mr-2"/> Prayer Request
                        </Button>
                        <Button variant="ghost" size="sm" className="!bg-yellow-100 dark:!bg-yellow-900/50 hover:!bg-yellow-200 text-yellow-700 dark:text-yellow-300">
                            <Share2 size={16} className="mr-2"/> Support Ministry
                        </Button>
                    </div>
                </div>

                <div className="mt-4 border-t border-gray-200 dark:border-gray-700">
                     <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                        <TabButton label="Schedule" isActive={activeTabContent === 'schedule'} onClick={() => setActiveTabContent('schedule')} />
                        <TabButton label="Testimonies" isActive={activeTabContent === 'testimonies'} onClick={() => setActiveTabContent('testimonies')} />
                        <TabButton label="Resources" isActive={activeTabContent === 'resources'} onClick={() => setActiveTabContent('resources')} />
                    </nav>
                </div>
                 <div className="mt-4">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default GCK;
