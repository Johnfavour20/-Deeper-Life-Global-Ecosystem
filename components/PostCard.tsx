import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, Bookmark, MoreHorizontal, Check, Repeat2 } from 'lucide-react';
import { CommunityPost } from '../types';

const QuotePost: React.FC<{ post: CommunityPost['quote'] }> = ({ post }) => {
    if (!post) return null;
    return (
        <div className="mt-2 border border-gray-200 dark:border-gray-600 rounded-2xl p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center space-x-2">
                <img src={post.avatar} alt={post.author} className="w-5 h-5 rounded-full" />
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{post.author}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">{post.content}</p>
        </div>
    );
};

const Poll: React.FC<{ pollData: CommunityPost['poll'] }> = ({ pollData }) => {
    const [voted, setVoted] = useState<string | null>(null);
    if (!pollData) return null;

    const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);

    return (
        <div className="space-y-2 mt-3">
            {pollData.options.map(option => {
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                const isVotedOption = voted === option.id;
                return (
                    <button
                        key={option.id}
                        onClick={() => setVoted(option.id)}
                        disabled={!!voted}
                        className="w-full text-left"
                    >
                        <div className={`relative p-2.5 border rounded-lg overflow-hidden transition-all ${isVotedOption ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                            {voted && <div className="absolute top-0 left-0 h-full bg-blue-100 dark:bg-blue-900/30" style={{ width: `${percentage}%` }}></div>}
                            <div className="relative flex justify-between items-center font-medium text-gray-800 dark:text-gray-200">
                                <span>{option.text}</span>
                                <div className="flex items-center space-x-2">
                                    {voted && <span className="text-sm">{percentage.toFixed(0)}%</span>}
                                    {isVotedOption && <Check size={16} className="text-blue-600" />}
                                </div>
                            </div>
                        </div>
                    </button>
                );
            })}
             <p className="text-xs text-gray-500 dark:text-gray-400 text-right pt-1">{totalVotes} votes</p>
        </div>
    );
};

const PostCard: React.FC<{ post: CommunityPost, isContinuationOfThread?: boolean }> = ({ post, isContinuationOfThread }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };
    
    const handleBookmark = () => setIsBookmarked(!isBookmarked);
    
    const formatContent = (text: string) => {
        const parts = text.split(/(#[a-zA-Z0-9_]+|@[a-zA-Z0-9_]+)/g);
        return parts.map((part, index) => {
            if (part.startsWith('#') || part.startsWith('@')) {
                return <span key={index} className="text-blue-500 hover:underline cursor-pointer">{part}</span>;
            }
            return part;
        });
    };

    return (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-xl p-5 shadow-lg relative transition-transform duration-200 hover:-translate-y-1">
            {isContinuationOfThread && <div className="absolute top-0 left-11 -translate-x-1/2 w-0.5 h-5 bg-gray-200 dark:bg-gray-600"></div>}
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <p className="font-bold text-gray-900 dark:text-gray-50">{post.author}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.time}</p>
                    </div>
                </div>
                 <button className="p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="mt-4 pl-[60px] text-gray-700 dark:text-gray-300 space-y-3">
                <p className="whitespace-pre-wrap">{formatContent(post.content)}</p>
                {post.imageUrl && (
                    <img src={post.imageUrl} alt="Post content" className="mt-3 rounded-lg w-full object-cover max-h-[500px]" />
                )}
                {post.poll && <Poll pollData={post.poll} />}
                {post.quote && <QuotePost post={post.quote} />}
            </div>

            <div className="mt-4 pl-[60px] flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{likeCount.toLocaleString()} Likes</span>
                <div className="flex space-x-3">
                    <span>{post.comments.toLocaleString()} Comments</span>
                    <span>{post.shares.toLocaleString()} Shares</span>
                </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-around text-gray-600 dark:text-gray-300">
                <button
                    onClick={handleLike}
                    className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors font-semibold ${isLiked ? 'text-blue-600 dark:text-blue-400' : ''}`}
                >
                    <ThumbsUp size={20} className={isLiked ? 'fill-current' : ''} />
                    <span>Like</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors font-semibold">
                    <MessageCircle size={20} />
                    <span>Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors font-semibold">
                    <Repeat2 size={20} />
                    <span>Quote</span>
                </button>
                <button 
                    onClick={handleBookmark}
                    className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors font-semibold ${isBookmarked ? 'text-purple-600 dark:text-purple-400' : ''}`}
                >
                    <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
                    <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;