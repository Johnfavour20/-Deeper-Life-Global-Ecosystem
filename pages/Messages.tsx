import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Camera, Search, MoreVertical, Users, MessageSquare as MessageSquareIcon, Star, Phone, Plus, Pencil, Video, Bell, ArrowUpRight, ArrowDownLeft, Link as LinkIcon, Volume2 } from 'lucide-react';
import { chatContacts, chatGroups, chatMessages, mockStories, mockCommunities, mockChannels, mockCalls } from '../data/chatData';
import ChatListItem from '../components/ChatListItem';
import ChatBubble from '../components/ChatBubble';
import { ChatMessage, Story, CommunityInfo, Channel, CallLog } from '../types';
import Logo from '../components/Logo';

// --- TAB COMPONENTS ---

const CommunitiesTab: React.FC = () => (
    <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center space-x-4 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="bg-gray-200 dark:bg-gray-600 rounded-lg w-12 h-12 flex items-center justify-center">
                    <Users className="text-gray-600 dark:text-gray-300" />
                </div>
                <span className="font-bold text-gray-900 dark:text-gray-50">New community</span>
            </button>
        </div>
        <div className="p-4 space-y-2">
            {mockCommunities.map(community => (
                <div key={community.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                    <img src={community.avatar} alt={community.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-gray-50">{community.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{community.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ChatsTab: React.FC = () => {
    const allConversations = [...chatContacts, ...chatGroups];
    const [activeChat, setActiveChat] = useState(allConversations[0]);
    
    // In a real app, you'd manage messages state here. For this clone, we'll just read from mock data.
    const messages = (chatMessages as any)[activeChat.id] || [];

    return (
        <div className="flex-1 overflow-y-auto">
            {allConversations.map(contact => (
                <ChatListItem 
                    key={contact.id} 
                    contact={contact}
                    isActive={activeChat.id === contact.id}
                    onClick={() => setActiveChat(contact)} 
                />
            ))}
        </div>
    );
};

const UpdatesTab: React.FC = () => {
    // Status Reel Component (adapted from Community.tsx)
    const StatusReel: React.FC<{ stories: Story[] }> = ({ stories }) => (
        <div className="p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-50">Status</h2>
                <button><MoreVertical size={20} className="text-gray-500 dark:text-gray-400" /></button>
            </div>
            <div className="flex space-x-4">
                <div className="flex-shrink-0 text-center w-16">
                    <div className="relative">
                        <img src="https://avatar.iran.liara.run/public/boy?username=johndoe" alt="My Status" className="w-14 h-14 rounded-full object-cover" />
                        <div className="absolute bottom-0 right-0 bg-whatsapp-accent text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-800">
                            <Plus size={14} />
                        </div>
                    </div>
                    <p className="text-xs mt-1 truncate text-gray-600 dark:text-gray-400">My status</p>
                </div>
                {stories.map(story => (
                    <div key={story.id} className="flex-shrink-0 text-center w-16">
                        <div className={`w-14 h-14 rounded-full p-0.5 border-2 ${story.viewed ? 'border-gray-300 dark:border-gray-600' : 'border-green-500'}`}>
                            <img src={story.avatar} alt={story.author} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <p className="text-xs mt-1 truncate text-gray-700 dark:text-gray-300">{story.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    // Channel List Item Component
    const ChannelListItem: React.FC<{ channel: Channel }> = ({ channel }) => (
         <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
            <img src={channel.avatar} alt={channel.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1 border-b border-gray-200 dark:border-gray-700 pb-3">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-900 dark:text-gray-50">{channel.name}</p>
                    {channel.muted && <Volume2 size={16} className="text-gray-400" />}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{channel.lastUpdate}</p>
            </div>
        </div>
    );
    
    return (
        <div className="flex-1 overflow-y-auto">
            <StatusReel stories={mockStories} />
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                 <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-gray-50">Channels</h2>
                    <button><Plus size={20} className="text-gray-500 dark:text-gray-400" /></button>
                </div>
                {mockChannels.map(channel => <ChannelListItem key={channel.id} channel={channel} />)}
            </div>
        </div>
    );
};

const CallsTab: React.FC = () => {
    const CallLogItem: React.FC<{ call: CallLog }> = ({ call }) => {
        const isMissed = call.direction === 'missed';
        const isOutgoing = call.direction === 'outgoing';
        
        const DirIcon = isOutgoing ? ArrowUpRight : ArrowDownLeft;
        
        return (
            <div className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                <img src={call.avatar} alt={call.contactName} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                    <p className={`font-bold ${isMissed ? 'text-red-500' : 'text-gray-900 dark:text-gray-50'}`}>{call.contactName}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                       <DirIcon size={16} className={`mr-1 ${isMissed ? 'text-red-500' : 'text-gray-500'}`} />
                       {call.time}
                    </div>
                </div>
                <button className="p-2 text-whatsapp-header dark:text-whatsapp-accent">
                    {call.type === 'video' ? <Video size={22} /> : <Phone size={22} />}
                </button>
            </div>
        );
    };
    
    return (
        <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <button className="w-full flex items-center space-x-4 p-2">
                    <div className="bg-whatsapp-accent rounded-full w-12 h-12 flex items-center justify-center">
                        <LinkIcon className="text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-gray-50 text-left">Create call link</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-left">Share a link for your Deeper Life call</p>
                    </div>
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Recent</h3>
                {mockCalls.map(call => <CallLogItem key={call.id} call={call} />)}
            </div>
        </div>
    );
};


// --- FLOATING ACTION BUTTON ---

// FIX: Changed prop type for `tab` to `ActiveTab` to match the state type, resolving the type mismatch error.
const FloatingActionButton: React.FC<{ tab: ActiveTab }> = ({ tab }) => {
    if (tab === 'chats') {
        return (
            <button className="absolute bottom-6 right-6 bg-whatsapp-accent text-white p-4 rounded-2xl shadow-lg hover:bg-green-600 transition-all">
                <MessageSquareIcon size={24} />
            </button>
        );
    }
    if (tab === 'updates') {
         return (
            <div className="absolute bottom-6 right-6 flex flex-col items-center gap-4">
                <button className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 p-3 rounded-xl shadow-lg hover:bg-gray-200 transition-all">
                    <Pencil size={20} />
                </button>
                <button className="bg-whatsapp-accent text-white p-4 rounded-2xl shadow-lg hover:bg-green-600 transition-all">
                    <Camera size={24} />
                </button>
            </div>
        );
    }
     if (tab === 'calls') {
        return (
            <button className="absolute bottom-6 right-6 bg-whatsapp-accent text-white p-4 rounded-2xl shadow-lg hover:bg-green-600 transition-all">
                <Phone size={24} className="fill-current text-white" />
            </button>
        );
    }
    return null;
};


// --- MAIN MESSAGES COMPONENT ---

type ActiveTab = 'communities' | 'chats' | 'updates' | 'calls';

const Messages: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('chats');
    
    const TabButton: React.FC<{tabName: ActiveTab, label: string, count?: number}> = ({ tabName, label, count }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`flex-1 py-3 text-sm font-bold uppercase transition-all duration-300 text-center ${
                    isActive
                        ? 'text-whatsapp-accent border-b-4 border-whatsapp-accent'
                        : 'text-gray-200/70 hover:text-white'
                }`}
            >
                <div className="flex items-center justify-center gap-2">
                    {label}
                    {count && count > 0 && <span className="bg-white/30 text-white text-xs rounded-full px-1.5 py-0.5">{count}</span>}
                </div>
            </button>
        );
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'communities': return <CommunitiesTab />;
            case 'chats': return <ChatsTab />;
            case 'updates': return <UpdatesTab />;
            case 'calls': return <CallsTab />;
            default: return <ChatsTab />;
        }
    };
    
    // Calculate total unread chats
    const unreadChats = [...chatContacts, ...chatGroups].reduce((acc, chat) => acc + (chat.unread || 0), 0);

    return (
        <div className="h-full w-full flex flex-col bg-white dark:bg-whatsapp-list-bg-dark text-gray-900 dark:text-gray-50 overflow-hidden">
            {/* Custom Header */}
            <header className="bg-whatsapp-header dark:bg-whatsapp-header-dark text-white flex-shrink-0">
                <div className="flex justify-between items-center px-3 h-16">
                    <Logo variant="sidebar" className="text-white" />
                    <div className="flex items-center space-x-4">
                        <button><Camera size={20} /></button>
                        <button><Search size={20} /></button>
                        <button><MoreVertical size={20} /></button>
                    </div>
                </div>
                <div className="flex items-center">
                    <TabButton tabName="communities" label="Communities" />
                    <TabButton tabName="chats" label="Chats" count={unreadChats} />
                    <TabButton tabName="updates" label="Updates" />
                    <TabButton tabName="calls" label="Calls" />
                </div>
            </header>
            
            {/* Main Content */}
            <main className="flex-1 relative overflow-hidden">
                {renderContent()}
                <FloatingActionButton tab={activeTab} />
            </main>
        </div>
    );
};

export default Messages;