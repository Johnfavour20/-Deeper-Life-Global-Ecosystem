import React from 'react';
import NavItem from './NavItem';
import { useAuth } from '../hooks/useAuth';
import { rolePrivilegeLevels } from '../constants';
import { Home, Tv, Music, BookOpen, Sparkles, Contact, Users, MessageSquare, Calendar, BarChart3, Box, Settings, X, ClipboardCheck, Banknote, UserCog, LogOut, Video, Feather, BrainCircuit, Clapperboard } from 'lucide-react';
import { ActiveTab } from '../types';
import Logo from './Logo';

interface SidebarProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }) => {
    const { userRole, logout } = useAuth();

    return (
        <div className={`fixed inset-y-0 left-0 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-72 bg-white dark:bg-gray-800 flex flex-col shadow-2xl border-r border-gray-100 dark:border-gray-700`}>
            <div className="flex items-center justify-between h-20 px-4 border-b border-gray-100 dark:border-gray-700">
                <Logo variant="sidebar" className="text-gray-900 dark:text-gray-50" />
                <button className="lg:hidden text-gray-500 dark:text-gray-400" onClick={() => setIsMenuOpen(false)}><X /></button>
            </div>

            <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                <NavItem icon={Home} label="Dashboard" id="dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={Tv} label="Live" id="live" activeTab={activeTab} setActiveTab={setActiveTab} badge="LIVE" />
                <NavItem icon={Clapperboard} label="Pastor's Messages" id="kumuyi_messages" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={Music} label="GHS Hymns" id="ghs" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={BookOpen} label="Bible" id="bible" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={Sparkles} label="STS" id="sts" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={Feather} label="Daily Manna" id="daily_manna" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={Contact} label="Directory" id="directory" activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700"><p className="px-4 text-xs font-semibold text-gray-400 uppercase">Community</p></div>
                <NavItem icon={Users} label="Connect" id="connect" activeTab={activeTab} setActiveTab={setActiveTab} badge="9+" />
                <NavItem icon={Calendar} label="Events" id="events" activeTab={activeTab} setActiveTab={setActiveTab} />
                <NavItem icon={Video} label="Meetings" id="meetings" activeTab={activeTab} setActiveTab={setActiveTab} />

                {rolePrivilegeLevels[userRole] >= rolePrivilegeLevels['group_pastor'] && (
                    <>
                        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700"><p className="px-4 text-xs font-semibold text-gray-400 uppercase">Leadership</p></div>
                        <NavItem icon={BarChart3} label="Analytics" id="analytics" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <NavItem icon={ClipboardCheck} label="Attendance" id="attendance" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <NavItem icon={Banknote} label="Financials" id="financials" activeTab={activeTab} setActiveTab={setActiveTab} />
                        <NavItem icon={UserCog} label="User Management" id="users" activeTab={activeTab} setActiveTab={setActiveTab} />
                    </>
                )}

                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700"><p className="px-4 text-xs font-semibold text-gray-400 uppercase">Resources</p></div>
                <NavItem icon={Box} label="Blockchain" id="blockchain" activeTab={activeTab} setActiveTab={setActiveTab} />

            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                <NavItem icon={Settings} label="Settings" id="settings" activeTab={activeTab} setActiveTab={setActiveTab} />
                 <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 transition-all duration-200"
                >
                    <LogOut size={20} className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;