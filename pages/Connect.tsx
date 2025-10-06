
import React, { useState } from 'react';
import { Home, Compass, Bell, Bookmark, User as UserIcon, BrainCircuit, Search, MoreHorizontal, Calendar, Rss, UserPlus, Star, ChevronLeft, Settings, LogOut, MessageSquare, HandHeart, Store, Newspaper, Menu, X, Filter, BookOpen, Users } from 'lucide-react';
import { communityPosts } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { mockNotifications } from '../data/notificationData';
import { mockFriendRequests, mockSuggestedUsers, mockSuggestedGroups, mockPrayerRequests, mockMarketplaceItems, mockBlogPosts, mockMentorshipProfiles } from '../data/mockData';
import { CommunityPost, Notification as NotificationType, ActiveTab, PrayerRequest, MarketplaceItem, BlogPost, MentorshipProfile, ConnectView } from '../types';

import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import Button from '../components/ui/Button';
import Logo from '../components/Logo';
import Messages from './Messages';
import AskKumuyi from './AskKumuyi';
import Modal from '../components/ui/Modal';

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
        <div className="flex flex-col h-full overflow-y-auto">
            <div className="p-4 space-y-6">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 shadow-md">
                    <h3 className="font-bold text-lg mb-3">What's Happening</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {trendingTopics.map(topic => (
                            <div key={topic} className="bg-gray-100/50 dark:bg-gray-700/50 p-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-600/50 cursor-pointer">
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
            <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <button onClick={() => setActiveTab('all')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>All</button>
                <button onClick={() => setActiveTab('mentions')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'mentions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Mentions</button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {notifications.map(notif => (
                     <div key={notif.id} className={`p-4 flex items-start gap-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
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

// Bookmarks View
const BookmarksView: React.FC = () => (
    <div className="flex flex-col h-full overflow-y-auto">
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

const PrayerRequestModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    return (
        <Modal show={isOpen} onClose={onClose} title="Submit Prayer Request">
            <div className="space-y-4">
                <textarea
                    className="w-full border-gray-300 dark:border-gray-600 rounded-lg p-3 text-base bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="Share your prayer request..."
                    rows={5}
                ></textarea>
                <div className="flex items-center">
                    <input id="anonymous" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Post anonymously</label>
                </div>
                <Button className="w-full">Submit Request</Button>
            </div>
        </Modal>
    );
};

const PrayerWallView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex flex-col h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            <PrayerRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <Button onClick={() => setIsModalOpen(true)} className="mb-6 w-full">Submit a Prayer Request</Button>
            <div className="space-y-4">
                {mockPrayerRequests.map(p => (
                    <div key={p.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-md">
                        <div className="flex items-start space-x-3">
                            <img src={p.avatar} alt={p.author} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-bold">{p.isAnonymous ? 'Anonymous Member' : p.author}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{p.timestamp}</p>
                            </div>
                        </div>
                        <p className="my-3 text-gray-700 dark:text-gray-300">{p.request}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{p.prayerCount} people are praying</span>
                            <Button size="sm" variant="ghost" className="!bg-blue-100 dark:!bg-blue-900/50 hover:!bg-blue-200"><HandHeart size={16} className="mr-2" /> I'm Praying</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MarketplaceView: React.FC = () => (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Marketplace</h2>
            <Button variant="ghost"><Filter size={16} className="mr-2" />Filter</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockMarketplaceItems.map(item => (
                <div key={item.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-lg shadow overflow-hidden group">
                    <div className="aspect-square overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3">
                        <p className="font-semibold truncate">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.seller}</p>
                        <p className="font-bold text-lg mt-1">₦{item.price.toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const BlogsView: React.FC = () => (
    <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-4">Blogs & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlogPosts.map(post => (
                 <div key={post.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow overflow-hidden group cursor-pointer">
                    <div className="aspect-video overflow-hidden">
                         <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{post.snippet}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                             <div className="flex items-center space-x-2">
                                <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full" />
                                <span>{post.author}</span>
                            </div>
                            <span>{post.readTime} min read</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const MentorshipView: React.FC = () => (
     <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-4">Mentorship Connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMentorshipProfiles.map(profile => (
                <div key={profile.userId} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-5 rounded-xl shadow text-center">
                    <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${profile.role === 'Mentor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{profile.role}</span>
                    <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-200 dark:border-gray-600" />
                    <h3 className="font-bold text-lg">{profile.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{profile.title}</p>
                    <div className="flex flex-wrap justify-center gap-1 my-3">
                        {profile.expertise.map(e => <span key={e} className="text-xs bg-gray-200/50 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">{e}</span>)}
                    </div>
                    <Button size="sm" variant="ghost">View Profile</Button>
                </div>
            ))}
        </div>
    </div>
);

// --- MAIN CONNECT COMPONENT ---

const ConnectSidebar: React.FC<{ 
    activeView: ConnectView; 
    setActiveView: (view: ConnectView) => void; 
    handleAppNavigation: (tab: ActiveTab) => void;
    isMenuOpen?: boolean;
    setIsMenuOpen?: (isOpen: boolean) => void;
}> = ({ activeView, setActiveView, handleAppNavigation, isMenuOpen, setIsMenuOpen }) => {
    const { logout } = useAuth();
    const handleNavItemClick = (view: ConnectView) => {
        setActiveView(view);
        if (setIsMenuOpen) setIsMenuOpen(false);
    };

    return (
        <div className="w-full md:w-64 lg:w-72 p-3 flex-shrink-0 flex flex-col justify-between h-full">
            <div>
                 <div className="p-2 mb-2 flex items-center justify-between">
                    <button onClick={() => handleAppNavigation('dashboard')} title="Back to Dashboard">
                        <Logo variant="sidebar" />
                    </button>
                    {isMenuOpen && setIsMenuOpen && (
                        <button className="md:hidden p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50" onClick={() => setIsMenuOpen(false)}>
                            <X />
                        </button>
                    )}
                </div>
                <div className="space-y-2">
                    <ConnectNavItem icon={Home} label="Home" isActive={activeView === 'home'} onClick={() => handleNavItemClick('home')} />
                    <ConnectNavItem icon={MessageSquare} label="Messages" isActive={activeView === 'messages'} onClick={() => handleNavItemClick('messages')} />
                    <ConnectNavItem icon={HandHeart} label="Prayer Wall" isActive={activeView === 'prayer_wall'} onClick={() => handleNavItemClick('prayer_wall')} />
                    <ConnectNavItem icon={Compass} label="Explore" isActive={activeView === 'explore'} onClick={() => handleNavItemClick('explore')} />
                    <ConnectNavItem icon={Bell} label="Notifications" isActive={activeView === 'notifications'} onClick={() => handleNavItemClick('notifications')} />
                    <ConnectNavItem icon={Bookmark} label="Bookmarks" isActive={activeView === 'bookmarks'} onClick={() => handleNavItemClick('bookmarks')} />
                    <ConnectNavItem icon={BrainCircuit} label="Ask Kumuyi (AI)" isActive={activeView === 'ask_kumuyi'} onClick={() => handleNavItemClick('ask_kumuyi')} />
                    <ConnectNavItem icon={Store} label="Marketplace" isActive={activeView === 'marketplace'} onClick={() => handleNavItemClick('marketplace')} />
                    <ConnectNavItem icon={Newspaper} label="Blogs" isActive={activeView === 'blogs'} onClick={() => handleNavItemClick('blogs')} />
                    <ConnectNavItem icon={Users} label="Mentorship" isActive={activeView === 'mentorship'} onClick={() => handleNavItemClick('mentorship')} />
                    <ConnectNavItem icon={UserIcon} label="Profile" isActive={activeView === 'profile'} onClick={() => handleNavItemClick('profile')} />
                </div>
                <Button size="lg" className="w-full mt-4 hidden md:block">Post</Button>
            </div>
            <div className="space-y-2">
                <button onClick={() => handleAppNavigation('settings')} className="w-full flex items-center space-x-4 px-3 py-3 rounded-full transition-colors duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50">
                    <Settings size={24} />
                    <span className="text-lg">Settings</span>
                </button>
                 <button onClick={logout} className="w-full flex items-center space-x-4 px-3 py-3 rounded-full transition-colors duration-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50">
                    <LogOut size={24} />
                    <span className="text-lg">Logout</span>
                </button>
            </div>
        </div>
    );
};


const ConnectNavItem: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-4 px-3 py-3 rounded-full transition-colors duration-200 ${isActive ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-bold' : 'hover:bg-gray-100/50 dark:hover:bg-gray-700/50'}`}>
        <Icon size={24} />
        <span className="text-lg">{label}</span>
    </button>
);

const RightSidebar: React.FC = () => {
    return (
        <div className="hidden lg:block w-80 xl:w-96 p-4 flex-shrink-0 overflow-y-auto">
            <div className="space-y-6">
                <div className="relative">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search Connect" className="w-full bg-gray-100/50 dark:bg-gray-700/50 border-transparent rounded-full pl-10 pr-4 py-2.5 text-sm" />
                </div>
                
                 <div className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4">
                    <h3 className="font-bold text-lg mb-3">Friend Requests</h3>
                    <div className="space-y-3">
                        {mockFriendRequests.map(req => (
                            <div key={req.id} className="flex items-center space-x-3">
                                <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{req.name}</p>
                                    <p className="text-xs text-gray-500">{req.mutualFriends} mutual friends</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm">Confirm</Button>
                                    <Button size="sm" variant="ghost" className="!bg-gray-200/50 dark:!bg-gray-600/50">Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4">
                    <h3 className="font-bold text-lg mb-3">Who to Follow</h3>
                    <div className="space-y-3">
                        {mockSuggestedUsers.map(user => (
                             <div key={user.id} className="flex items-center space-x-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.reason}</p>
                                </div>
                                <Button size="sm" variant="ghost" className="!bg-gray-200/50 dark:!bg-gray-600/50">Follow</Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4">
                    <h3 className="font-bold text-lg mb-3">Suggested Groups</h3>
                     <div className="space-y-3">
                        {mockSuggestedGroups.map(group => (
                            <div key={group.id} className="flex items-center space-x-3">
                                <img src={group.avatar} alt={group.name} className="w-10 h-10 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{group.name}</p>
                                    <p className="text-xs text-gray-500">{group.members}</p>
                                </div>
                                <Button size="sm" variant="ghost" className="!bg-gray-200/50 dark:!bg-gray-600/50">Join</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConnectBottomNav: React.FC<{ activeView: ConnectView; setActiveView: (view: ConnectView) => void }> = ({ activeView, setActiveView }) => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 flex z-40">
        <BottomNavItem icon={Home} label="Home" isActive={activeView === 'home'} onClick={() => setActiveView('home')} />
        <BottomNavItem icon={MessageSquare} label="Messages" isActive={activeView === 'messages'} onClick={() => setActiveView('messages')} />
        <BottomNavItem icon={HandHeart} label="Prayer" isActive={activeView === 'prayer_wall'} onClick={() => setActiveView('prayer_wall')} />
        <BottomNavItem icon={Bell} label="Notifications" isActive={activeView === 'notifications'} onClick={() => setActiveView('notifications')} />
        <BottomNavItem icon={UserIcon} label="Profile" isActive={activeView === 'profile'} onClick={() => setActiveView('profile')} />
    </div>
);

const BottomNavItem: React.FC<{ icon: React.ElementType; label: string; isActive: boolean; onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Icon size={24} />
        <span className="text-xs mt-1">{label}</span>
    </button>
);

const ConnectHeader: React.FC<{ activeView: ConnectView; onMenuClick: () => void; }> = ({ activeView, onMenuClick }) => {
    const { userProfile } = useAuth();
    const titles: Record<ConnectView, string> = { home: 'Home', explore: 'Explore', notifications: 'Notifications', bookmarks: 'Bookmarks', profile: 'Profile', messages: 'Messages', prayer_wall: 'Prayer Wall', ask_kumuyi: 'Ask Kumuyi (AI)', marketplace: 'Marketplace', blogs: 'Blogs', mentorship: 'Mentorship' };
    
    return (
        <div className="flex-shrink-0 flex items-center gap-4 p-4 border-b border-gray-200/80 dark:border-gray-700/80 md:hidden bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <button onClick={onMenuClick}>
                <img src={userProfile.profilePictureUrl} alt="Menu" className="w-8 h-8 rounded-full" />
            </button>
            <h2 className="text-xl font-bold">{titles[activeView]}</h2>
        </div>
    );
};


interface ConnectProps {
    setActiveTab: (tab: ActiveTab) => void;
}
const Connect: React.FC<ConnectProps> = ({ setActiveTab }) => {
    const [activeView, setActiveView] = useState<ConnectView>('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleViewChange = (view: ConnectView) => {
        setActiveView(view);
        setIsMenuOpen(false);
    };
    
    const renderMainContent = () => {
        switch (activeView) {
            case 'home': return <CommunityFeed posts={communityPosts} />;
            case 'explore': return <ExploreView />;
            case 'notifications': return <NotificationsView />;
            case 'bookmarks': return <BookmarksView />;
            case 'profile': return <ProfileView />;
            case 'messages': return <Messages />;
            case 'prayer_wall': return <PrayerWallView />;
            case 'ask_kumuyi': return <AskKumuyi />;
            case 'marketplace': return <MarketplaceView />;
            case 'blogs': return <BlogsView />;
            case 'mentorship': return <MentorshipView />;
            default: return null;
        }
    };
    
    return (
        <div className="flex h-full text-gray-900 dark:text-gray-50">
            {/* Mobile Sidebar (Drawer) */}
            <div className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="fixed inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)}></div>
                <div className="relative z-10 h-full w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/50">
                    <ConnectSidebar activeView={activeView} setActiveView={handleViewChange} handleAppNavigation={setActiveTab} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                </div>
            </div>
           
           {/* Desktop Sidebar */}
           <nav className="hidden md:flex flex-col border-r border-white/20 dark:border-gray-700/50 h-screen sticky top-0 bg-white/30 dark:bg-black/30 backdrop-blur-xl">
             <ConnectSidebar activeView={activeView} setActiveView={handleViewChange} handleAppNavigation={setActiveTab} />
           </nav>

           <main className="flex-1 flex flex-col border-r border-white/20 dark:border-gray-700/50 overflow-hidden pb-16 md:pb-0">
                <ConnectHeader activeView={activeView} onMenuClick={() => setIsMenuOpen(true)} />
                {renderMainContent()}
           </main>

           <aside className="h-screen sticky top-0 bg-white/10 dark:bg-black/10 backdrop-blur-md">
               <RightSidebar />
           </aside>

           <ConnectBottomNav activeView={activeView} setActiveView={setActiveView} />
        </div>
    );
};

export default Connect;