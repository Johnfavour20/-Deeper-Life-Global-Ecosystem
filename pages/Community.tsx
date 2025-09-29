import React, { useState } from 'react';
// FIX: Imported the `Volume2` icon from lucide-react to resolve an undefined component error.
import { Home, Compass, Bell, MessageSquare, Bookmark, User as UserIcon, BrainCircuit, Search, MoreHorizontal, Calendar, Tv, Users as CommunityIcon, Plus, Pencil, Video, Rss, ArrowUpRight, ArrowDownLeft, Link as LinkIcon, Phone, Camera, MoreVertical as MoreVerticalIcon, Star, Heart, MessageCircle as MessageCommentIcon, Repeat, UserPlus, Image, ListOrdered, MapPin, Smile, Volume2, ChevronLeft, Paperclip, Mic } from 'lucide-react';
import { communityPosts, churchEvents } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { mockNotifications } from '../data/notificationData';
import { chatContacts, chatGroups, chatMessages, mockStories, mockCommunities, mockChannels, mockCalls } from '../data/chatData';
import { CommunityPost, Story, CommunityInfo, Channel, CallLog, Notification as NotificationType, ChatMessage } from '../types';

import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import AskKumuyi from './AskKumuyi';
import Button from '../components/ui/Button';
import ChatListItem from '../components/ChatListItem';
import ChatBubble from '../components/ChatBubble';
import Logo from '../components/Logo';

// Type for the active view in this component
type ConnectView = 'home' | 'explore' | 'notifications' | 'messages' | 'bookmarks' | 'profile' | 'ask_kumuyi';

// --- SUB-COMPONENTS FOR NEW VIEWS ---

// Community Feed Component (Used in Home, Bookmarks, Profile)
const CommunityFeed: React.FC<{ posts: CommunityPost[] }> = ({ posts }) => (
    <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <CreatePost />
            <div className="space-y-4">
                {posts.map((post, index) => {
                    const prevPost = index > 0 ? posts[index - 1] : null;
                    const isContinuationOfThread = !!(post.threadId && prevPost && prevPost.threadId === post.threadId);
                    return <PostCard key={post.id} post={post} isContinuationOfThread={isContinuationOfThread} />;
                })}
            </div>
        </div>
    </div>
);


// Explore View
const ExploreView: React.FC = () => {
    const trendingTopics = ["#GCK2024", "#Holiness", "#DailyManna", "#WFKumuyi", "#YouthConference"];
    return (
        <div className="flex flex-col h-full">
            <h2 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">Explore</h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                    <h3 className="font-bold text-lg mb-3">What's Happening</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {trendingTopics.map(topic => (
                            <div key={topic} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                                <p className="font-bold text-gray-800 dark:text-gray-200">{topic}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 5000 + 500)} posts</p>
                            </div>
                        ))}
                    </div>
                </div>
                <h3 className="font-bold text-lg">For You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {communityPosts.filter(p => p.imageUrl || p.poll).map(post => <PostCard key={post.id} post={post} />)}
                </div>
            </div>
        </div>
    );
};

// Notifications View
const NotificationsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'mentions'>('all');
    const notifications = mockNotifications;

    const getIcon = (type: string) => {
        switch(type) {
            case 'sermon': return <Rss className="w-6 h-6 text-blue-500" />;
            case 'prayer': return <UserPlus className="w-6 h-6 text-green-500" />;
            case 'announcement': return <Bell className="w-6 h-6 text-yellow-500" />;
            case 'event': return <Calendar className="w-6 h-6 text-indigo-500" />;
            default: return <Star className="w-6 h-6 text-gray-500" />;
        }
    };
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <button onClick={() => setActiveTab('all')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>All</button>
                <button onClick={() => setActiveTab('mentions')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'mentions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Mentions</button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {notifications.map(notif => (
                     <div key={notif.id} className={`p-4 flex items-start gap-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${!notif.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                        <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                        <div>
                            <p className="font-semibold">{notif.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{notif.description}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Messages View (WhatsApp Clone)
const MessagesView: React.FC = () => {
    type MessagesViewTab = 'communities' | 'chats' | 'updates' | 'calls';
    const [activeTab, setActiveTab] = useState<MessagesViewTab>('chats');
    const [activeChat, setActiveChat] = useState<(typeof chatContacts[0] | typeof chatGroups[0]) | null>(null);
    const unreadChats = [...chatContacts, ...chatGroups].reduce((acc, chat) => acc + (chat.unread || 0), 0);
    
    const messages = activeChat ? (chatMessages as any)[activeChat.id] || [] : [];
    
    const FloatingActionButton: React.FC<{ tab: MessagesViewTab }> = ({ tab }) => {
        if (tab === 'chats') {
            return (
                <button className="absolute bottom-6 right-6 bg-whatsapp-accent text-white p-4 rounded-2xl shadow-lg hover:bg-green-600 transition-all">
                    <MessageSquare size={24} />
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
    
    const TabButton: React.FC<{tabName: MessagesViewTab, label: string, count?: number}> = ({ tabName, label, count }) => {
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

    const ChatListView: React.FC = () => {
        const allConversations = [...chatContacts, ...chatGroups];
        return (
            <div className="flex-1 overflow-y-auto">
                {allConversations.map(contact => (
                    <ChatListItem 
                        key={contact.id} 
                        contact={contact}
                        isActive={activeChat?.id === contact.id}
                        onClick={() => setActiveChat(contact)} 
                    />
                ))}
            </div>
        );
    };

    const ChatDetailView: React.FC = () => (
         <div className="w-full h-full flex flex-col bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark bg-whatsapp-pattern">
             <header className="p-2.5 bg-whatsapp-header text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <button onClick={() => setActiveChat(null)} className="md:hidden p-2 rounded-full hover:bg-black/10"><ChevronLeft/></button>
                    <img src={activeChat?.avatar} alt={activeChat?.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="font-bold">{activeChat?.name}</h2>
                        <p className="text-sm text-gray-200">{activeChat?.status}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-black/10"><Video size={20} /></button>
                    <button className="p-2 rounded-full hover:bg-black/10"><Phone size={20} /></button>
                    <button className="p-2 rounded-full hover:bg-black/10"><MoreVerticalIcon size={20} /></button>
                </div>
            </header>
            <main className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg: ChatMessage) => (
                    <ChatBubble key={msg.id} message={msg} onReplyClick={() => {}} />
                ))}
            </main>
            <footer className="p-2 bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark flex items-center gap-2">
                <div className="flex-1 flex items-center bg-white dark:bg-gray-700 rounded-full px-2">
                    <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Smile size={22} /></button>
                    <input type="text" placeholder="Type a message" className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none" />
                    <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Paperclip size={22} /></button>
                </div>
                <button className="bg-whatsapp-accent text-white rounded-full p-3 hover:bg-green-600 transition-colors">
                    <Mic size={20} />
                </button>
            </footer>
        </div>
    );
    
    return (
        <div className="h-full w-full flex bg-white dark:bg-whatsapp-list-bg-dark text-gray-900 dark:text-gray-50 overflow-hidden">
            <div className={`w-full md:w-1/3 lg:w-1/4 flex-col border-r border-gray-200 dark:border-gray-700 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                <header className="bg-whatsapp-header dark:bg-whatsapp-header-dark text-white flex-shrink-0">
                    <div className="flex justify-between items-center px-3 h-16">
                        <Logo variant="sidebar" className="text-white" />
                        <div className="flex items-center space-x-4">
                            <button><Camera size={20} /></button>
                            <button><Search size={20} /></button>
                            <button><MoreVerticalIcon size={20} /></button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <TabButton tabName="communities" label="Communities" />
                        <TabButton tabName="chats" label="Chats" count={unreadChats} />
                        <TabButton tabName="updates" label="Updates" />
                        <TabButton tabName="calls" label="Calls" />
                    </div>
                </header>
                <main className="flex-1 relative overflow-hidden">
                    <ChatListView />
                    <FloatingActionButton tab={activeTab} />
                </main>
            </div>
            <div className={`w-full md:w-2/3 lg:w-3/4 ${activeChat ? 'flex' : 'hidden md:flex'}`}>
                {activeChat ? <ChatDetailView/> : 
                    <div className="w-full h-full items-center justify-center text-center text-gray-500 dark:text-gray-400 bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark bg-whatsapp-pattern hidden md:flex">
                        <div>
                            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Deeper Life Messenger</h2>
                            <p className="font-medium mt-1">Select a chat to start a secure and encrypted conversation.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

// Bookmarks View
const BookmarksView: React.FC = () => (
    <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">Bookmarks</h2>
        <CommunityFeed posts={communityPosts.filter(p => p.id === 1 || p.id === 3)} />
    </div>
);

// Profile View
const ProfileView: React.FC = () => {
    const { userProfile } = useAuth();
    const userPosts = communityPosts.filter(p => p.author === userProfile.name || p.author === 'John Doe'); // Mocking 'John Doe' as current user
    return (
        <div className="flex flex-col h-full overflow-y-auto">
             <div className="flex-shrink-0">
                <div className="h-48 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-900 dark:to-cyan-900"></div>
                <div className="px-4 -mt-16">
                    <div className="flex justify-between items-end">
                        <img className="h-32 w-32 rounded-full border-4 border-white dark:border-black object-cover" src={userProfile.profilePictureUrl} alt={userProfile.name} />
                        <Button variant="ghost" className="border border-gray-300 dark:border-gray-600">Edit Profile</Button>
                    </div>
                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{userProfile.email}</p>
                        <p className="mt-2">{userProfile.bio}</p>
                         <div className="flex space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span><span className="font-bold text-gray-800 dark:text-gray-200">1,254</span> Following</span>
                            <span><span className="font-bold text-gray-800 dark:text-gray-200">2,841</span> Followers</span>
                        </div>
                    </div>
                </div>
             </div>
             <div className="mt-4 border-b border-gray-200 dark:border-gray-700 flex justify-around">
                <button className="flex-1 p-3 font-semibold text-center text-blue-600 border-b-2 border-blue-600">Posts</button>
                <button className="flex-1 p-3 font-semibold text-center text-gray-500">Replies</button>
                <button className="flex-1 p-3 font-semibold text-center text-gray-500">Media</button>
             </div>
             <div className="flex-1">
                <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {userPosts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                </div>
             </div>
        </div>
    );
};

// --- MAIN CONNECT COMPONENT ---

// New Left Sidebar
const ConnectSidebar: React.FC<{ activeView: ConnectView; setActiveView: (view: ConnectView) => void }> = ({ activeView, setActiveView }) => (
    <div className="w-full md:w-64 lg:w-72 p-3 flex-shrink-0">
        <div className="space-y-2">
            <ConnectNavItem icon={Home} label="Home" isActive={activeView === 'home'} onClick={() => setActiveView('home')} />
            <ConnectNavItem icon={BrainCircuit} label="Ask Kumuyi (AI)" isActive={activeView === 'ask_kumuyi'} onClick={() => setActiveView('ask_kumuyi')} />
            <ConnectNavItem icon={Compass} label="Explore" isActive={activeView === 'explore'} onClick={() => setActiveView('explore')} />
            <ConnectNavItem icon={Bell} label="Notifications" isActive={activeView === 'notifications'} onClick={() => setActiveView('notifications')} />
            <ConnectNavItem icon={MessageSquare} label="Messages" isActive={activeView === 'messages'} onClick={() => setActiveView('messages')} />
            <ConnectNavItem icon={Bookmark} label="Bookmarks" isActive={activeView === 'bookmarks'} onClick={() => setActiveView('bookmarks')} />
            <ConnectNavItem icon={UserIcon} label="Profile" isActive={activeView === 'profile'} onClick={() => setActiveView('profile')} />
        </div>
        <Button size="lg" className="w-full mt-4">Post</Button>
    </div>
);

// New Nav Item for the left sidebar
const ConnectNavItem: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-4 px-3 py-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-500 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
        <Icon size={24} />
        <span className="text-lg">{label}</span>
    </button>
);

// New Right Sidebar
const RightSidebar: React.FC = () => {
    const trendingTopics = ["#GCK2024", "#Holiness", "#DailyManna", "#WFKumuyi", "#YouthConference"];
    
    return (
        <div className="hidden lg:block w-80 xl:w-96 p-4 flex-shrink-0">
            <div className="space-y-6">
                <div className="relative">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search Connect" className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-full pl-10 pr-4 py-2.5 text-sm" />
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                    <h3 className="font-bold text-lg mb-3">Trending Topics</h3>
                    <div className="space-y-3">
                        {trendingTopics.map(topic => (
                             <div key={topic}>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-gray-800 dark:text-gray-200">{topic}</p>
                                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 5000 + 500)} posts</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                    <h3 className="font-bold text-lg mb-3">Upcoming Events</h3>
                    <div className="space-y-3">
                        {churchEvents.slice(1, 4).map(event => (
                            <div key={event.title} className="flex items-start space-x-3">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                                    <Calendar className="text-blue-600 dark:text-blue-300" size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{event.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// NEW: Bottom Nav Item for mobile
const BottomNavItem: React.FC<{ icon: React.ElementType; label: string; isActive: boolean; onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Icon size={24} />
        <span className="text-xs mt-1">{label}</span>
    </button>
);

// NEW: Bottom Nav for mobile
const ConnectBottomNav: React.FC<{ activeView: ConnectView; setActiveView: (view: ConnectView) => void }> = ({ activeView, setActiveView }) => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex z-40">
        <BottomNavItem icon={Home} label="Home" isActive={activeView === 'home'} onClick={() => setActiveView('home')} />
        <BottomNavItem icon={BrainCircuit} label="Ask AI" isActive={activeView === 'ask_kumuyi'} onClick={() => setActiveView('ask_kumuyi')} />
        <BottomNavItem icon={Bell} label="Notifications" isActive={activeView === 'notifications'} onClick={() => setActiveView('notifications')} />
        <BottomNavItem icon={MessageSquare} label="Messages" isActive={activeView === 'messages'} onClick={() => setActiveView('messages')} />
        <BottomNavItem icon={UserIcon} label="Profile" isActive={activeView === 'profile'} onClick={() => setActiveView('profile')} />
    </div>
);


const Connect: React.FC = () => {
    const [activeView, setActiveView] = useState<ConnectView>('home');

    const renderMainContent = () => {
        switch (activeView) {
            case 'home':
                return (
                    <div className="flex flex-col h-full">
                        <h2 className="text-xl font-bold p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">Home</h2>
                        <CommunityFeed posts={communityPosts} />
                    </div>
                );
            case 'explore': return <ExploreView />;
            case 'notifications': return <NotificationsView />;
            case 'messages': return <MessagesView />;
            case 'bookmarks': return <BookmarksView />;
            case 'profile': return <ProfileView />;
            case 'ask_kumuyi':
                 return (
                    <div className="flex flex-col h-full">
                         <div className="flex-shrink-0 flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                            <img src="https://avatar.iran.liara.run/public/8" alt="Pastor W.F. Kumuyi" className="w-10 h-10 rounded-full"/>
                            <div>
                                <h2 className="text-xl font-bold">Ask Kumuyi (AI)</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Your Personal AI Bible Counselor</p>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <AskKumuyi />
                        </div>
                    </div>
                );
            default: return null;
        }
    };
    
    return (
        <div className="flex h-full bg-white dark:bg-black text-gray-900 dark:text-gray-50 -m-4 sm:-m-6 lg:-m-8">
           <nav className="hidden md:flex flex-col border-r border-gray-200 dark:border-gray-700">
             <ConnectSidebar activeView={activeView} setActiveView={setActiveView} />
           </nav>
           <main className="flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700 overflow-hidden pb-16 md:pb-0">
                {renderMainContent()}
           </main>
           <aside>
               <RightSidebar />
           </aside>
           <ConnectBottomNav activeView={activeView} setActiveView={setActiveView} />
        </div>
    );
};

export default Connect;