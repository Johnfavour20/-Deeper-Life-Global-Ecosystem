import React from 'react';
import { Play, Share2 } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';

interface MessageCardProps {
    title: string;
    speaker: string;
    date: string;
    duration: string;
    category: string;
    isLive?: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({ title, speaker, date, duration, category, isLive = false }) => {
    const { showToast } = useNotification();
    const handleShare = () => {
        navigator.clipboard.writeText(`Check out this message: "${title}" by ${speaker}.`);
        showToast("Message details copied to clipboard!");
    };
    return (
        <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-50 line-clamp-2">{title}</h4>
                    <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-1">{speaker}</p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2 space-x-4">
                        <span>{date}</span>
                        <span>{duration}</span>
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{category}</span>
                    </div>
                </div>
                {isLive && (
                    <div className="flex items-center bg-secondary text-white text-xs px-2 py-1 rounded-full ml-3">
                        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                        LIVE
                    </div>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <button className="flex items-center bg-primary-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-primary-700 transition-colors">
                    <Play size={14} className="mr-1" /> Play
                </button>
                <button onClick={handleShare} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" aria-label="Share">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
    );
};
export default MessageCard;