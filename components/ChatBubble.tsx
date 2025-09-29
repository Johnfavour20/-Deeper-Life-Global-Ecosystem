import React from 'react';
import { CheckCheck } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
    message: ChatMessage;
    onReplyClick: (threadId: string) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onReplyClick }) => {
    const isMe = message.from === 'me';
    
    const ReadReceipt = () => (
        <CheckCheck 
            size={16} 
            className={message.status === 'read' ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'} 
        />
    );

    return (
        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            <div 
                className={`relative rounded-lg px-2.5 py-1.5 max-w-sm lg:max-w-md shadow-sm ${
                    isMe 
                    ? 'bg-whatsapp-sent dark:bg-whatsapp-sent-dark text-gray-800 dark:text-gray-50 rounded-tr-none' 
                    : 'bg-white dark:bg-whatsapp-received-dark text-gray-900 dark:text-gray-50 rounded-tl-none'
                }`}
            >
                {!isMe && message.author && (
                     <p className="text-sm font-semibold text-purple-500 dark:text-purple-400 mb-0.5">{message.author}</p>
                )}
                
                {message.type === 'image' && message.content && (
                    <div className="mb-1">
                         <img src={message.content} alt="attachment" className="rounded-lg max-w-full h-auto cursor-pointer" />
                    </div>
                )}
                
                <p className="text-sm leading-snug whitespace-pre-wrap">{message.text}</p>
                
                <div className="flex items-center justify-end space-x-1.5 mt-1 float-right">
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">{message.time}</span>
                    {isMe && <ReadReceipt />}
                </div>

                {message.replyCount && message.replyCount > 0 && (
                     <button onClick={() => onReplyClick(message.threadId!)} className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md flex items-center gap-1">
                        {message.replyCount} {message.replyCount > 1 ? 'replies' : 'reply'}
                    </button>
                )}
            </div>
             {message.reactions && (
                <div className="flex items-center space-x-1 mt-1">
                    {Object.entries(message.reactions).map(([emoji, count]) => (
                         <div key={emoji} className="flex items-center space-x-1 bg-white/80 dark:bg-gray-600/80 backdrop-blur-sm rounded-full shadow-sm px-1.5 py-0.5 border dark:border-gray-500/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500">
                            <span className="text-xs">{emoji}</span>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">{count}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChatBubble;