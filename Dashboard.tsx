import React from 'react';
import { Users, Globe, Wifi, Music, BookOpen, Church, Tv, Languages, Settings, Heart, MessageSquare, Share2, Play, MapPin, Sparkles, Contact, Radio, TrendingUp, DollarSign, UserPlus } from 'lucide-react';
import StatCard from '../components/StatCard';
import MessageCard from '../components/MessageCard';
import QuickAccessCard from '../components/QuickAccessCard';
import { globalStats } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { privilegeLevels, rolePrivilegeLevels } from '../constants';
import { ActiveTab, AudioTrack } from '../types';
import { useAudio } from '../context/AudioContext';

interface DashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
}

const RadioCard: React.FC = () => {
    const { playTrack, currentTrack, isPlaying, streamLanguage } = useAudio();
    
    const radioTrack: AudioTrack = {
        type: 'radio',
        title: `Deeper Life Radio (${streamLanguage})`,
        artist: 'Live Broadcast',
        url: '', // URL is managed in context
        artwork: 'https://avatar.iran.liara.run/public/8'
    };

    const isRadioPlaying = isPlaying && currentTrack?.type === 'radio';

    const handlePlayRadio = () => {
        playTrack(radioTrack);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 flex items-center">
                    <Radio className="mr-2 text-secondary" /> Deeper Life Radio
                </h2>
                {isRadioPlaying && <span className="ml-2 bg-secondary text-white text-xs px-2 py-1 rounded-full animate-pulse">LIVE</span>}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Now Playing</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">GCK with Pastor Kumuyi</p>
                </div>
                <button onClick={handlePlayRadio} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                    <Play size={16} className="mr-1" /> Listen Live
                </button>
            </div>
        </div>
    );
};

const PastorOverview: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Pastor's Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg text-center">
                <TrendingUp className="mx-auto text-primary-500 mb-2" />
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">225</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Attendance</p>
            </div>
             <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <DollarSign className="mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">₦55k</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Offering</p>
            </div>
             <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <UserPlus className="mx-auto text-red-500 mb-2" />
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">5</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">New Converts</p>
            </div>
             <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <Users className="mx-auto text-purple-500 mb-2" />
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Small Groups</p>
            </div>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
    const { userRole } = useAuth();
    const [currentTime] = React.useState(new Date());

    const isPastorOrHigher = rolePrivilegeLevels[userRole] >= rolePrivilegeLevels['group_pastor'];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-500 via-primary-700 to-primary-900 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome to Deeper Life Global Ecosystem</h1>
                        <p className="text-primary-100 text-lg">Where Heaven Meets Technology</p>
                        <p className="text-primary-200 text-sm mt-2">Role: {privilegeLevels[userRole]} • {currentTime.toLocaleString()}</p>
                    </div>
                    <div className="text-center hidden md:block">
                        <div className="bg-white/20 rounded-full p-4"><Globe size={48} /></div>
                        <p className="text-sm mt-2">Global Unity</p>
                    </div>
                </div>
            </div>
            
            {isPastorOrHigher && <PastorOverview />}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard icon={Users} title="Global Members" value={globalStats.totalMembers} trend="+2.1%" color="primary" />
                <StatCard icon={Globe} title="Active Nations" value={globalStats.activeNations} color="green" />
                <StatCard icon={Wifi} title="Live Viewers" value={globalStats.liveViewers} trend="+15%" color="red" />
                <StatCard icon={Music} title="GHS Hymns" value={globalStats.dailyGHS} color="purple" />
                <StatCard icon={BookOpen} title="STS Completion" value={globalStats.stsCompletion} trend="+5%" color="orange" />
                <StatCard icon={Church} title="Online Churches" value={globalStats.onlineChurches} color="indigo" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <RadioCard />
                 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Verse of the Day</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1 italic">"Trust in the Lord with all your heart..."</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Proverbs 3:5</p>
                    </div>
                    <button onClick={() => setActiveTab('bible')} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Read More</button>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickAccessCard icon={BookOpen} title="Holy Bible" description="50+ versions, 180+ languages" colorClass="text-primary-600" onClick={() => setActiveTab('bible')} />
                <QuickAccessCard icon={Music} title="Gospel Hymns & Songs" description="260+ hymns with audio & sheets" colorClass="text-purple-600" onClick={() => setActiveTab('ghs')} />
                <QuickAccessCard icon={Sparkles} title="Search The Scriptures" description="AI-powered daily devotionals" colorClass="text-orange-600" onClick={() => setActiveTab('sts')} />
                <QuickAccessCard icon={Contact} title="Church Directory" description="Find churches & members" colorClass="text-green-600" onClick={() => setActiveTab('directory')} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Recent Messages</h2>
                    {/* FIX: Changed 'messages' to 'connect' to match the ActiveTab type and navigate to the correct page. */}
                    <button onClick={() => setActiveTab('kumuyi_messages')} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium">View All →</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MessageCard title="Emmanuel, Jesus the Majestic God of Glory" speaker="Pastor W.F. Kumuyi" date="Dec 26, 2023" duration="52 min" category="GCK Global" isLive/>
                    <MessageCard title="The Expected Christ" speaker="Pastor W.F. Kumuyi" date="Nov 15, 2023" duration="48 min" category="GCK India" />
                    <MessageCard title="Gracious Emmanuel for Soaring Heavenward Eagles" speaker="Pastor W.F. Kumuyi" date="Dec 26, 2023" duration="45 min" category="Impact Academy" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;