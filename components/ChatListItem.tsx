import React from 'react';

interface Contact {
    id: number | string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
}

interface ChatListItemProps {
    contact: Contact;
    isActive: boolean;
    onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ contact, isActive, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className={`w-full text-left p-2.5 flex items-center space-x-3 transition-colors duration-200 ${
                isActive 
                ? 'bg-gray-200 dark:bg-whatsapp-active-chat-dark' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
        >
            <div className="relative flex-shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full" />
                {contact.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>}
            </div>
            <div className="flex-1 overflow-hidden">
                 <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900 dark:text-gray-50 truncate">{contact.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{contact.time}</p>
                </div>
                <div className="flex justify-between items-start mt-0.5">
                    <p className="text-sm text-whatsapp-secondary-text dark:text-gray-400 truncate pr-2">{contact.lastMessage}</p>
                    {contact.unread > 0 && <span className="bg-whatsapp-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">{contact.unread}</span>}
                </div>
            </div>
        </button>
    );
};

export default ChatListItem;