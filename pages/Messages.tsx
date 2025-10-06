import React, { useState, useRef, useEffect } from 'react';
import { Camera, Search, MoreVertical, Users, MessageSquare as MessageSquareIcon, Phone, Plus, Pencil, Video, ArrowUpRight, ArrowDownLeft, Link as LinkIcon, Volume2, Mic, Paperclip, Smile, ChevronLeft, Send } from 'lucide-react';
import { chatContacts, chatGroups, chatMessages, mockStories, mockCommunities, mockChannels, mockCalls } from '../data/chatData';
import ChatListItem from '../components/ChatListItem';
import ChatBubble from '../components/ChatBubble';
import { ChatMessage, Story, CommunityInfo, Channel, CallLog } from '../types';

type AnyItem = (typeof chatContacts[0]) | (typeof chatGroups[0]) | CommunityInfo | Story | Channel | CallLog;

// --- HEADER AND TABS ---
type ActiveTab = 'communities' | 'chats' | 'updates' | 'calls';

const Header: React.FC<{ activeTab: ActiveTab, setActiveTab: (tab: ActiveTab) => void, unreadCount: number }> = ({ activeTab, setActiveTab, unreadCount }) => {
    const TabButton: React.FC<{ tabName: ActiveTab, label: string, count?: number }> = ({ tabName, label, count }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`flex-1 py-3 text-sm font-bold uppercase transition-all duration-300 text-center ${isActive ? 'text-whatsapp-accent border-b-4 border-whatsapp-accent' : 'text-gray-500 dark:text-gray-200/70 hover:text-white'}`}
            >
                <div className="flex items-center justify-center gap-2">
                    {label}
                    {count && count > 0 && <span className={`text-xs rounded-full px-1.5 py-0.5 ${isActive ? 'bg-whatsapp-accent text-white' : 'bg-gray-500 dark:bg-white/30 text-white'}`}>{count}</span>}
                </div>
            </button>
        );
    };

    return (
        <header className="bg-white dark:bg-whatsapp-header-dark text-gray-800 dark:text-white flex-shrink-0">
            <div className="flex justify-between items-center px-3 h-16">
                <h1 className="text-xl font-bold">Messages</h1>
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 dark:text-gray-200/70"><Camera size={20} /></button>
                    <button className="text-gray-600 dark:text-gray-200/70"><Search size={20} /></button>
                    <button className="text-gray-600 dark:text-gray-200/70"><MoreVertical size={20} /></button>
                </div>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
                <TabButton tabName="communities" label="Communities" />
                <TabButton tabName="chats" label="Chats" count={unreadCount} />
                <TabButton tabName="updates" label="Updates" />
                <TabButton tabName="calls" label="Calls" />
            </div>
        </header>
    );
};

// --- LIST PANELS FOR EACH TAB ---

const TabListPanel: React.FC<{ activeTab: ActiveTab, onSelectItem: (item: AnyItem) => void, activeItem: AnyItem | null }> = ({ activeTab, onSelectItem, activeItem }) => {
    const renderList = () => {
        switch (activeTab) {
            case 'communities':
                return mockCommunities.map(item => (
                    <ChatListItem key={item.id} contact={{...item, lastMessage: item.description, unread: 0, time: '', online: false}} isActive={activeItem?.id === item.id} onClick={() => onSelectItem(item)} />
                ));
            case 'chats':
                const allConversations = [...chatContacts, ...chatGroups];
                return allConversations.map(item => (
                     <ChatListItem key={item.id} contact={item} isActive={activeItem?.id === item.id} onClick={() => onSelectItem(item)} />
                ));
            case 'updates':
                // Simplified view for updates
                return mockStories.map(item => (
                     <ChatListItem key={item.id} contact={{...item, name: item.author, lastMessage: 'Status update', unread: 0, time: 'Today', online: false}} isActive={activeItem?.id === item.id} onClick={() => onSelectItem(item)} />
                ));
            case 'calls':
                 return mockCalls.map(item => (
                     <ChatListItem key={item.id} contact={{...item, name: item.contactName, lastMessage: `${item.direction} ${item.type} call`, unread: 0, time: item.time, online: false}} isActive={activeItem?.id === item.id} onClick={() => onSelectItem(item)} />
                ));
            default:
                return null;
        }
    };
    return <div className="flex-1 overflow-y-auto">{renderList()}</div>
};

// --- RIGHT-SIDE PANELS ---

const ConversationPanel: React.FC<{ chat: any, onBack: () => void }> = ({ chat, onBack }) => {
    const messages = (chatMessages as any)[chat.id] || [];
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    
    return (
        <>
            <div className="p-2.5 bg-white dark:bg-whatsapp-header-dark text-gray-800 dark:text-white flex items-center justify-between flex-shrink-0 border-b border-gray-200 dark:border-transparent">
                <div className="flex items-center space-x-3">
                    <button onClick={onBack} className="md:hidden p-2 rounded-full hover:bg-black/10 text-gray-600 dark:text-white"><ChevronLeft /></button>
                    <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <h2 className="font-bold">{chat.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-200">{chat.status || 'online'}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full text-gray-600 dark:text-white hover:bg-black/10"><Video size={20} /></button>
                    <button className="p-2 rounded-full text-gray-600 dark:text-white hover:bg-black/10"><Phone size={20} /></button>
                    <button className="p-2 rounded-full text-gray-600 dark:text-white hover:bg-black/10"><MoreVertical size={20} /></button>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((msg: ChatMessage) => (
                    <ChatBubble key={msg.id} message={msg} onReplyClick={() => {}} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-2 bg-gray-100 dark:bg-whatsapp-chat-bg-dark flex items-center gap-2">
               <div className="flex-1 flex items-center bg-white dark:bg-whatsapp-received-dark rounded-full px-2">
                   <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Smile size={22} /></button>
                    <input type="text" placeholder="Type a message" className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none" />
                    <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Paperclip size={22} /></button>
               </div>
                <button className="bg-whatsapp-accent text-white rounded-full p-3 hover:bg-green-600 transition-colors">
                    <Send size={20} />
                </button>
            </div>
        </>
    );
};

const GenericDetailPanel: React.FC<{ item: AnyItem, onBack: () => void }> = ({ item, onBack }) => (
    <div className="flex flex-col h-full">
         <div className="p-2.5 bg-white dark:bg-whatsapp-header-dark text-gray-800 dark:text-white flex items-center space-x-3 flex-shrink-0 border-b border-gray-200 dark:border-transparent">
            <button onClick={onBack} className="md:hidden p-2 rounded-full hover:bg-black/10 text-gray-600 dark:text-white"><ChevronLeft /></button>
            <h2 className="font-bold">Details</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
                 <img src={(item as any).avatar} alt={(item as any).name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold">{(item as any).name || (item as any).contactName}</h3>
                <p className="text-gray-500 mt-2">Full functionality for this section is coming soon!</p>
            </div>
        </div>
    </div>
);

const PlaceholderPanel = () => (
     <div className="flex-1 flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
        <div>
            <MessageSquareIcon size={48} className="mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Deeper Life Messenger</h2>
            <p className="font-medium mt-1">Select a conversation to start messaging.</p>
        </div>
    </div>
);


// --- MAIN MESSAGES COMPONENT ---

const Messages: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('chats');
    const [activeItem, setActiveItem] = useState<AnyItem | null>(chatContacts[0]);

    const unreadChats = [...chatContacts, ...chatGroups].reduce((acc, chat) => acc + (chat.unread || 0), 0);
    
    const isChat = (item: AnyItem | null): item is (typeof chatContacts[0] | typeof chatGroups[0]) => {
        return item ? 'lastMessage' in item : false;
    };

    return (
        <div className="flex h-full w-full bg-white dark:bg-whatsapp-list-bg-dark text-gray-900 dark:text-gray-50 overflow-hidden">
            {/* Left Pane: List of chats */}
            <div className={`w-full md:w-1/3 xl:w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col ${activeItem ? 'hidden md:flex' : 'flex'}`}>
                <Header activeTab={activeTab} setActiveTab={setActiveTab} unreadCount={unreadChats} />
                <TabListPanel activeTab={activeTab} onSelectItem={setActiveItem} activeItem={activeItem} />
            </div>

            {/* Right Pane: Conversation */}
            <div className={`w-full md:w-2/3 xl:w-3/4 flex-col bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark bg-whatsapp-pattern ${activeItem ? 'flex' : 'hidden md:flex'}`}>
                {isChat(activeItem) ? (
                    <ConversationPanel chat={activeItem} onBack={() => setActiveItem(null)} />
                ) : activeItem ? (
                     <GenericDetailPanel item={activeItem} onBack={() => setActiveItem(null)} />
                ) : (
                    <PlaceholderPanel />
                )}
            </div>
        </div>
    );
};

export default Messages;