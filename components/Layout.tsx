import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ActiveTab } from '../types';
import GlobalAudioPlayer from './ui/GlobalAudioPlayer';
import { useAudio } from '../context/AudioContext';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: ActiveTab;
    handleTabNavigation: (tab: ActiveTab) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    toggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, handleTabNavigation, isMenuOpen, setIsMenuOpen, toggleDarkMode }) => {
    const { currentTrack } = useAudio();
    return (
        <>
            <Sidebar
                activeTab={activeTab}
                setActiveTab={handleTabNavigation}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    setIsMenuOpen={setIsMenuOpen}
                    toggleDarkMode={toggleDarkMode}
                />
                <main className={`flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 ${currentTrack ? 'pb-24' : ''}`}>
                    {children}
                </main>
            </div>
            <GlobalAudioPlayer />
        </>
    );
};

export default Layout;