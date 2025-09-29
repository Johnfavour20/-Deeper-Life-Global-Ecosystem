import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Search, Bell, Sun, Moon, Menu, Globe, ChevronDown, Rss, UserPlus } from 'lucide-react';
import { privilegeLevels } from '../constants';
import { useAudio } from '../context/AudioContext';
import { mockNotifications } from '../data/notificationData';

interface HeaderProps {
    setIsMenuOpen: (open: boolean) => void;
    toggleDarkMode: () => void;
}

const NotificationPanel: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const notifications = mockNotifications;
    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type: string) => {
        switch(type) {
            case 'sermon': return <Rss className="w-5 h-5 text-blue-500" />;
            case 'prayer': return <UserPlus className="w-5 h-5 text-green-500" />;
            default: return <Bell className="w-5 h-5 text-yellow-500" />;
        }
    };
    
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border dark:border-gray-700">
            <div className="p-3 flex justify-between items-center border-b dark:border-gray-700">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-0.5">{unreadCount} New</span>}
            </div>
            <div className="max-h-80 overflow-y-auto">
                {notifications.map(notif => (
                     <div key={notif.id} className={`p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                        <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                        <div>
                            <p className="text-sm font-semibold">{notif.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{notif.description}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
             <div className="p-2 border-t dark:border-gray-700 text-center">
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 w-full hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md py-1">View All Notifications</button>
            </div>
        </div>
    );
};


const LanguageSelector: React.FC = () => {
    const { streamLanguage, setStreamLanguage } = useAudio();
    const [isOpen, setIsOpen] = useState(false);
    const languages = ['English', 'Yoruba', 'Igbo', 'French'];

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center">
                <Globe size={20} />
                <ChevronDown size={16} className="ml-1" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border dark:border-gray-700">
                    {languages.map(lang => (
                        <a
                            key={lang}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setStreamLanguage(lang);
                                setIsOpen(false);
                            }}
                            className={`block px-4 py-2 text-sm ${streamLanguage === lang ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                            {lang}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};


const Header: React.FC<HeaderProps> = ({ setIsMenuOpen, toggleDarkMode }) => {
    const { userProfile, userRole, isDarkMode } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="flex-shrink-0 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 p-4 flex justify-between items-center">
            <button className="lg:hidden text-gray-500" onClick={() => setIsMenuOpen(true)}>
                <Menu />
            </button>
            <div className="relative w-full max-w-md hidden lg:block">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search messages, hymns, members..."
                    className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center space-x-2">
                <LanguageSelector />
                <button onClick={toggleDarkMode} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(prev => !prev)}
                        className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <Bell size={22} />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                           {mockNotifications.filter(n => !n.read).length}
                        </span>
                    </button>
                    {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
                </div>
                <div className="flex items-center space-x-3">
                    <img src={userProfile.profilePictureUrl} alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="hidden md:block">
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-50">{userProfile.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{privilegeLevels[userRole]}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;