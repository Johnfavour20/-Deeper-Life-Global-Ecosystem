import React, { useState, useMemo } from 'react';
import { kumuyiMessagesData } from '../data/kumuyiMessagesData';
import { KumuyiMessage, AudioTrack } from '../types';
import { Search, Clapperboard, Music, Play, Pause, Download, Share2, ThumbsUp, BrainCircuit, Sparkles, X } from 'lucide-react';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { useNotification } from '../hooks/useNotification';
import { useAudio } from '../context/AudioContext';
import { summarizeSermon, generateKeyTakeaways, generateDiscussionPoints } from '../services/geminiService';

const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const MessageCard: React.FC<{ message: KumuyiMessage, onSelect: (msg: KumuyiMessage) => void }> = ({ message, onSelect }) => (
    <div onClick={() => onSelect(message)} className="flex-shrink-0 w-80 cursor-pointer group">
        <div className="relative aspect-video bg-gray-700 rounded-xl overflow-hidden shadow-lg">
            <img src={message.thumbnailUrl} alt={message.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-mono">{message.duration}</div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={48} className="text-white drop-shadow-lg" />
            </div>
        </div>
        <div className="mt-2 px-1">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600">{message.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{message.speaker}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{message.views} views • {message.date}</p>
        </div>
    </div>
);

const AudioMessageItem: React.FC<{ 
    message: KumuyiMessage, 
    onDownload: () => void,
    onTogglePlay: () => void,
    isPlaying: boolean,
    isCurrent: boolean,
    progress: number,
    duration: number,
    onScrub: (value: number) => void
}> = ({ message, onDownload, onTogglePlay, isPlaying, isCurrent, progress, duration, onScrub }) => (
    <div className={`rounded-lg transition-colors ${isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
        <div className="flex items-center space-x-4 p-3">
            <img src={message.thumbnailUrl} alt={message.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 dark:text-gray-200 truncate">{message.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{message.speaker} • {message.series}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{message.date} • {message.duration}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={onTogglePlay} className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button onClick={onDownload} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"><Download size={18} /></button>
            </div>
        </div>
        {isCurrent && (
            <div className="px-3 pb-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatTime(progress)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={progress}
                        onChange={(e) => onScrub(Number(e.target.value))}
                        className="w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full"
                    />
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        )}
    </div>
);


const MessageCarousel: React.FC<{ title: string, messages: KumuyiMessage[], onSelect: (msg: KumuyiMessage) => void }> = ({ title, messages, onSelect }) => (
    <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">{title}</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4 -m-2 p-2">
            {messages.map(msg => <MessageCard key={msg.id} message={msg} onSelect={onSelect} />)}
        </div>
    </div>
);

const MessageDetailModal: React.FC<{ message: KumuyiMessage, onClose: () => void, onDownload: () => void }> = ({ message, onClose, onDownload }) => {
    const [aiResult, setAiResult] = useState<string | null>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiToolTitle, setAiToolTitle] = useState('');

    const handleAiRequest = async (tool: 'summary' | 'takeaways' | 'discussion') => {
        setIsAiLoading(true);
        setAiResult(null);
        let result = '';
        try {
            if (tool === 'summary') {
                setAiToolTitle('AI Summary');
                result = await summarizeSermon(message.description);
            } else if (tool === 'takeaways') {
                setAiToolTitle('Key Takeaways');
                result = await generateKeyTakeaways(message.description);
            } else if (tool === 'discussion') {
                setAiToolTitle('Discussion Points');
                result = await generateDiscussionPoints(message.description);
            }
            setAiResult(result);
        } catch (e) {
            console.error(e);
            setAiResult('Could not generate AI content. Please try again.');
        } finally {
            setIsAiLoading(false);
        }
    };

    const relatedMessages = kumuyiMessagesData.filter(m => m.series === message.series && m.id !== message.id && m.type === 'video').slice(0, 5);
    return (
        <Modal show={true} onClose={onClose} title="" size="5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-h-[80vh]">
                <div className="lg:col-span-2 flex flex-col overflow-y-auto">
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <p className="text-white">Video Player for "{message.title}"</p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">{message.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                            <span>{message.views} views</span>
                            <span>{message.date}</span>
                            <span>#{message.series}</span>
                        </div>
                         <div className="flex items-center space-x-2 mt-4">
                            <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-semibold"><ThumbsUp size={18}/> {message.views}</button>
                            <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-semibold"><Share2 size={18}/> Share</button>
                            <button onClick={onDownload} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full font-semibold"><Download size={18}/> Download</button>
                        </div>
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-sm font-semibold mb-1">Description</p>
                            <p className="text-sm">{message.description}</p>
                        </div>

                        <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                             <h3 className="font-bold text-lg flex items-center gap-2 mb-3 text-purple-800 dark:text-purple-300"><BrainCircuit size={20} /> AI Tools</h3>
                             <div className="flex flex-wrap gap-2">
                                <Button size="sm" variant="ghost" onClick={() => handleAiRequest('summary')}>Summarize</Button>
                                <Button size="sm" variant="ghost" onClick={() => handleAiRequest('takeaways')}>Key Takeaways</Button>
                                <Button size="sm" variant="ghost" onClick={() => handleAiRequest('discussion')}>Discussion Points</Button>
                             </div>
                             {(isAiLoading || aiResult) && (
                                <div className="mt-4 p-4 border-t border-purple-200 dark:border-purple-700/50 bg-white dark:bg-gray-800 rounded-b-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-purple-700 dark:text-purple-300">{aiToolTitle}</h4>
                                        <button onClick={() => setAiResult(null)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={16}/></button>
                                    </div>
                                    {isAiLoading ? (
                                        <div className="flex items-center justify-center h-24">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                                        </div>
                                    ) : (
                                        <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: aiResult?.replace(/\n/g, '<br />').replace(/\*/g, '•') ?? '' }} />
                                    )}
                                </div>
                             )}
                        </div>

                    </div>
                </div>
                <div className="lg:col-span-1 overflow-y-auto space-y-3">
                    <h3 className="font-bold">Up Next in {message.series}</h3>
                    {relatedMessages.map(msg => (
                         <div key={msg.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <img src={msg.thumbnailUrl} alt={msg.title} className="w-32 aspect-video rounded-md object-cover"/>
                            <div>
                                <p className="font-semibold text-sm line-clamp-2">{msg.title}</p>
                                <p className="text-xs text-gray-500">{msg.views} views</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};


const KumuyiMessages: React.FC = () => {
    type MessagesTab = 'video' | 'audio';
    const [activeTab, setActiveTab] = useState<MessagesTab>('video');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<KumuyiMessage | null>(null);
    const { showToast } = useNotification();
    const { playTrack, currentTrack, isPlaying, togglePlay, progress, duration, audioRef } = useAudio();

    const { videoMessages, audioMessages } = useMemo(() => {
        const lowercasedSearch = searchTerm.toLowerCase();
        const filtered = searchTerm.length > 2
            ? kumuyiMessagesData.filter(m => 
                m.title.toLowerCase().includes(lowercasedSearch) ||
                m.series.toLowerCase().includes(lowercasedSearch) ||
                m.description.toLowerCase().includes(lowercasedSearch)
            )
            : kumuyiMessagesData;

        return {
            videoMessages: filtered.filter(m => m.type === 'video'),
            audioMessages: filtered.filter(m => m.type === 'audio')
        };
    }, [searchTerm]);

    const featuredMessage = videoMessages.find(m => m.isFeatured);
    const gckSeries = videoMessages.filter(m => m.series === 'GCK Global' && !m.isFeatured);
    const faithSeries = videoMessages.filter(m => m.series === 'Faith Series');

    const handleDownload = () => {
        showToast('Your download will begin shortly.', 'success');
    };

    const handlePlayAudio = (message: KumuyiMessage) => {
        if (!message.audioUrl) {
            showToast('Audio for this message is not available.', 'error');
            return;
        }
        const track: AudioTrack = {
            type: 'message',
            title: message.title,
            artist: message.speaker,
            url: message.audioUrl,
            artwork: message.thumbnailUrl
        };
        playTrack(track);
    };

    const handleTogglePlay = (message: KumuyiMessage) => {
        if (currentTrack?.title === message.title) {
            togglePlay();
        } else {
            handlePlayAudio(message);
        }
    };

    const handleScrub = (newTime: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    return (
        <div className="space-y-6">
             {selectedMessage && (
                <MessageDetailModal message={selectedMessage} onClose={() => setSelectedMessage(null)} onDownload={handleDownload} />
            )}

            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Pastor Kumuyi's Messages</h1>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                    <button onClick={() => setActiveTab('video')} className={`px-6 py-2 text-sm font-bold rounded-full flex items-center gap-2 ${activeTab === 'video' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}><Clapperboard size={16}/> Videos</button>
                    <button onClick={() => setActiveTab('audio')} className={`px-6 py-2 text-sm font-bold rounded-full flex items-center gap-2 ${activeTab === 'audio' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}><Music size={16}/> Audio</button>
                </div>
                <div className="relative w-full sm:w-auto">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search messages..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full sm:w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full pl-11 pr-4 py-2.5" />
                </div>
            </div>

            {activeTab === 'video' ? (
                 <div className="space-y-8">
                    {featuredMessage && !searchTerm && (
                         <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Featured Message</h2>
                            <div onClick={() => setSelectedMessage(featuredMessage)} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer group">
                                <div className="aspect-video bg-gray-700 rounded-xl overflow-hidden relative">
                                     <img src={featuredMessage.thumbnailUrl} alt={featuredMessage.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play size={64} className="text-white drop-shadow-lg" />
                                    </div>
                                     <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold drop-shadow-md">{featuredMessage.title}</h3>
                                        <p className="text-sm drop-shadow-md">{featuredMessage.speaker}</p>
                                    </div>
                                </div>
                            </div>
                         </div>
                    )}
                    {gckSeries.length > 0 && <MessageCarousel title="GCK Global Series" messages={gckSeries} onSelect={setSelectedMessage} />}
                    {faithSeries.length > 0 && <MessageCarousel title="Faith Series" messages={faithSeries} onSelect={setSelectedMessage} />}
                 </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                         {audioMessages.length > 0 ? audioMessages.map(msg => {
                            const isCurrent = currentTrack?.type === 'message' && currentTrack?.title === msg.title;
                            return (
                                <AudioMessageItem 
                                    key={msg.id} 
                                    message={msg} 
                                    onDownload={handleDownload}
                                    onTogglePlay={() => handleTogglePlay(msg)}
                                    isPlaying={isCurrent && isPlaying}
                                    isCurrent={isCurrent}
                                    progress={isCurrent ? progress : 0}
                                    duration={isCurrent ? duration : 0}
                                    onScrub={handleScrub}
                                />
                            );
                         }) : <p className="p-4 text-center text-gray-500">No audio messages found.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default KumuyiMessages;