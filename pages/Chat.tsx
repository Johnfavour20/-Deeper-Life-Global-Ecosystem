import React, { useState } from 'react';
import { Send, MessageSquare, Paperclip, Smile, Search, Phone, Video, MoreVertical, Users, AtSign, Settings, X, Mic } from 'lucide-react';
import { chatContacts, chatGroups, chatMessages } from '../data/chatData';
import ChatListItem from '../components/ChatListItem';
import ChatBubble from '../components/ChatBubble';
import { ChatMessage } from '../types';

const ThreadView: React.FC<{ threadId: string; onClose: () => void; }> = ({ threadId, onClose }) => {
    const allMessages: ChatMessage[] = Object.values(chatMessages).flat();
    const parentMessage = allMessages.find(m => m.threadId === threadId && !m.parentId);
    const replies = allMessages.filter(m => m.threadId === threadId && m.parentId);

    if (!parentMessage) return null;

    return (
        <div className="absolute top-0 right-0 w-full h-full md:w-2/5 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col z-10 shadow-2xl">
            <div className="p-3 bg-whatsapp-header text-white flex justify-between items-center flex-shrink-0">
                <div>
                    <h3 className="font-bold">Thread</h3>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark bg-whatsapp-pattern">
                <ChatBubble message={parentMessage} onReplyClick={() => {}} />
                <div className="border-t border-gray-300 dark:border-gray-600 pt-4 space-y-4">
                    {replies.map(reply => <ChatBubble key={reply.id} message={reply} onReplyClick={() => {}} />)}
                </div>
            </div>
             <div className="p-2 border-t dark:border-gray-700 bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark flex items-center gap-2">
                <div className="flex-1 flex items-center bg-white dark:bg-gray-700 rounded-full px-2">
                    <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Smile size={22} /></button>
                    <input type="text" placeholder="Reply in thread..." className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none" />
                    <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Paperclip size={22} /></button>
                </div>
                <button className="bg-whatsapp-accent text-white rounded-full p-3 hover:bg-green-600 transition-colors">
                    <Mic size={20} />
                </button>
            </div>
        </div>
    );
};

const Chat: React.FC = () => {
    const [activeChatId, setActiveChatId] = useState<string | null>('1');
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const allConversations = [...chatContacts, ...chatGroups];
    const activeChat = allConversations.find(c => c.id.toString() === activeChatId);
    const messages = activeChatId ? (chatMessages as any)[activeChatId] || [] : [];

    const ConversationPlaceholder = () => (
         <div className="flex-1 flex items-center justify-center text-center text-gray-500 dark:text-gray-400 bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark bg-whatsapp-pattern">
            <div>
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Deeper Life Messenger</h2>
                <p className="font-medium mt-1">Select a chat to start a secure and encrypted conversation.</p>
            </div>
        </div>
    );

    return (
        <div className="relative h-[calc(100vh-10rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg flex overflow-hidden">
            {/* Column 1: Navigation Rail */}
            <div className="w-16 bg-gray-50 dark:bg-gray-900 p-2 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center justify-between">
                <div className="space-y-4">
                    <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"><MessageSquare size={22} /></button>
                    <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"><Users size={22} /></button>
                    <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"><AtSign size={22} /></button>
                </div>
                <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"><Settings size={22} /></button>
            </div>

            {/* Column 2: Conversation List */}
            <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">All Chats</h1>
                    <div className="relative mt-2">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search or start new chat" className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {allConversations.map(contact => (
                        <ChatListItem 
                            key={contact.id} 
                            contact={contact}
                            isActive={activeChatId === contact.id.toString()}
                            onClick={() => setActiveChatId(contact.id.toString())} 
                        />
                    ))}
                </div>
            </div>

            {/* Column 3: Chat View */}
            <div className="hidden md:flex w-2/3 flex-col bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark bg-whatsapp-pattern">
                {activeChat ? (
                    <>
                        <div className="p-2.5 bg-whatsapp-header text-white flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center space-x-3">
                                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <h2 className="font-bold">{activeChat.name}</h2>
                                    <p className="text-sm text-gray-200">{activeChat.status}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-full hover:bg-black/10"><Video size={20} /></button>
                                <button className="p-2 rounded-full hover:bg-black/10"><Phone size={20} /></button>
                                <button className="p-2 rounded-full hover:bg-black/10"><MoreVertical size={20} /></button>
                            </div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-3">
                            {messages.map((msg: ChatMessage) => (
                                <ChatBubble key={msg.id} message={msg} onReplyClick={setActiveThreadId} />
                            ))}
                        </div>

                        <div className="p-2 bg-whatsapp-chat-bg dark:bg-whatsapp-chat-bg-dark flex items-center gap-2">
                           <div className="flex-1 flex items-center bg-white dark:bg-gray-700 rounded-full px-2">
                               <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Smile size={22} /></button>
                                <input type="text" placeholder="Type a message" className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none" />
                                <button className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-full"><Paperclip size={22} /></button>
                           </div>
                            <button className="bg-whatsapp-accent text-white rounded-full p-3 hover:bg-green-600 transition-colors">
                                <Mic size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <ConversationPlaceholder />
                )}
            </div>
            {activeThreadId && <ThreadView threadId={activeThreadId} onClose={() => setActiveThreadId(null)} />}
        </div>
    );
};
export default Chat;