import React, { useState, useEffect } from 'react';
import { NotificationProvider } from './context/NotificationContext';
import Toast from './components/ui/Toast';
import Layout from './components/Layout';
import { useAuth } from './hooks/useAuth';
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import { ActiveTab } from './types';

import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import Hymns from './pages/Hymns';
import Bible from './pages/Bible';
import STS from './pages/STS';
import DailyManna from './pages/DailyManna';
import Directory from './pages/Directory';
import Connect from './pages/Community'; // Renamed Community to Connect Hub
import Events from './pages/Events';
import Analytics from './pages/Analytics';
import Blockchain from './pages/Blockchain';
import Settings from './pages/Settings';
import Attendance from './pages/Attendance';
import Financials from './pages/Financials';
import Users from './pages/Users';
import Meetings from './pages/Meetings';
import Live from './pages/Live';
import KumuyiMessages from './pages/KumuyiMessages';


const App: React.FC = () => (
    <NotificationProvider>
        <AuthProvider>
            <AudioProvider>
                <AppContent />
            </AudioProvider>
            <Toast />
        </AuthProvider>
    </NotificationProvider>
);

const AppContent: React.FC = () => {
    const { user, isDarkMode } = useAuth();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [isDarkMode]);

    return (
        <div className={`${isDarkMode ? 'dark' : ''}`}>
            {user ? <MainApp /> : <LoginPage />}
        </div>
    );
};


const MainApp: React.FC = () => {
    const { setIsDarkMode, handleCancelChanges, hasUnsavedChanges } = useAuth();
    const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleTabNavigation = (targetTab: ActiveTab) => {
        if (activeTab === 'settings' && hasUnsavedChanges) {
            if (window.confirm('You have unsaved changes that will be lost. Are you sure you want to leave this page?')) {
                handleCancelChanges(); 
                setActiveTab(targetTab);
                setIsMenuOpen(false);
            }
        } else {
            setActiveTab(targetTab);
            setIsMenuOpen(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard setActiveTab={handleTabNavigation} />;
            case 'live': return <Live />;
            case 'kumuyi_messages': return <KumuyiMessages />;
            case 'ghs': return <Hymns />;
            case 'bible': return <Bible />;
            case 'sts': return <STS />;
            case 'daily_manna': return <DailyManna />;
            case 'directory': return <Directory />;
            case 'connect': return <Connect />;
            case 'events': return <Events />;
            case 'meetings': return <Meetings />;
            case 'analytics': return <Analytics />;
            case 'blockchain': return <Blockchain />;
            case 'settings': return <Settings />;
            case 'attendance': return <Attendance />;
            case 'financials': return <Financials />;
            case 'users': return <Users />;
            default:
                // This default case handles any unmapped activeTab values.
                // It should ideally not be reached if ActiveTab type is exhaustive.
                return <Dashboard setActiveTab={handleTabNavigation} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Layout
                activeTab={activeTab}
                handleTabNavigation={handleTabNavigation}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                toggleDarkMode={() => setIsDarkMode(prev => !prev)}
            >
                {renderContent()}
            </Layout>
        </div>
    );
};

export default App;