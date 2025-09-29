import React, { useState, useMemo, useEffect } from 'react';
import { Music, FileText, Volume2, Search, X, Star, Plus, Minus, Sparkles } from 'lucide-react';
import { mockHymns as allHymns } from '../data/hymnsData';
import { useAudio } from '../context/AudioContext';
import { AudioTrack, Hymn, HymnRecommendation } from '../types';
import Modal from '../components/ui/Modal';
import { hymnSheets } from '../assets/hymnSheets';
import { generateHymnRecommendations } from '../services/geminiService';
import Button from '../components/ui/Button';
import { useNotification } from '../hooks/useNotification';

const HymnDetailModal: React.FC<{ 
    hymn: Hymn; 
    onClose: () => void; 
    onPlay: (hymn: Hymn) => void;
    isFavorite: boolean;
    onToggleFavorite: (hymnNumber: number) => void;
}> = ({ hymn, onClose, onPlay, isFavorite, onToggleFavorite }) => {
    const [fontSize, setFontSize] = useState(1); // Initial font size in rem

    const increaseFontSize = () => setFontSize(s => Math.min(s + 0.1, 2.0));
    const decreaseFontSize = () => setFontSize(s => Math.max(s - 0.1, 0.8));

    return (
        <Modal show={true} onClose={onClose} title={`GHS ${hymn.number}: ${hymn.title}`} size="3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh]">
                <div className="flex flex-col">
                     <div className="flex items-center justify-end gap-2 mb-2 flex-shrink-0">
                         <span className="text-sm text-gray-500 dark:text-gray-400">Font Size:</span>
                         <button onClick={decreaseFontSize} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Decrease font size">
                             <Minus size={16}/>
                         </button>
                         <button onClick={increaseFontSize} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Increase font size">
                             <Plus size={16}/>
                         </button>
                    </div>
                    <div className="overflow-y-auto pr-2 space-y-4 flex-1">
                        <div className="prose dark:prose-invert" style={{ fontSize: `${fontSize}rem` }}>
                            {hymn.lyrics.map((line, index) => (
                                <p key={index} className="mb-0">{line || <br />}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                     <div className="flex items-center space-x-2">
                        <button onClick={() => onPlay(hymn)} disabled={!hymn.audioUrl} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <Volume2 size={18} className="mr-2" /> Play Audio
                        </button>
                         <button 
                            onClick={() => onToggleFavorite(hymn.number)} 
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Star size={22} className={`transition-all ${isFavorite ? 'fill-yellow-400 text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`} />
                        </button>
                        <div className="text-sm text-right flex-grow">
                            <p className="font-semibold">{hymn.key}</p>
                            <p className="text-gray-500 dark:text-gray-400">{hymn.category}</p>
                        </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden flex-1">
                        <img src={hymnSheets[hymn.sheetMusicUrl] || hymnSheets['hymn-1']} alt={`Sheet music for ${hymn.title}`} className="w-full h-full object-contain bg-white"/>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

const AiRecommenderModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSelectHymn: (hymn: Hymn) => void;
}> = ({ isOpen, onClose, onSelectHymn }) => {
    const { showToast } = useNotification();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<HymnRecommendation[]>([]);

    const handleGenerate = async () => {
        if (!prompt) {
            showToast('Please describe the kind of hymn you are looking for.', 'error');
            return;
        }
        setIsLoading(true);
        setRecommendations([]);
        try {
            const result = await generateHymnRecommendations(prompt, allHymns);
            setRecommendations(result);
        } catch (error) {
            console.error(error);
            showToast('Could not get recommendations. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleHymnClick = (hymnNumber: number) => {
        const fullHymn = allHymns.find(h => h.number === hymnNumber);
        if (fullHymn) {
            onSelectHymn(fullHymn);
        }
    };
    
    return (
        <Modal show={isOpen} onClose={onClose} title="AI Worship Planner" size="2xl">
            <div className="space-y-4">
                 <p className="text-sm text-gray-600 dark:text-gray-400">Describe a theme, scripture, or feeling, and the AI will suggest suitable hymns for your service or personal worship.</p>
                 <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Hymns about God's faithfulness for a testimony service' or 'An opening hymn for a sermon on the cross'"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                    <Sparkles size={16} className="mr-2" />
                    {isLoading ? 'Generating...' : 'Get Recommendations'}
                </Button>

                {isLoading && (
                    <div className="flex items-center justify-center h-48">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-700"></div>
                    </div>
                )}
                
                {recommendations.length > 0 && (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {recommendations.map(rec => (
                            <div key={rec.number} onClick={() => handleHymnClick(rec.number)} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                <p className="font-bold">GHS {rec.number}: {rec.title}</p>
                                <p className="text-sm italic text-gray-600 dark:text-gray-400">"{rec.reason}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};


const Hymns: React.FC = () => {
    const [ghsSearchTerm, setGhsSearchTerm] = useState('');
    const { playTrack } = useAudio();
    const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem('ghsFavorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to parse favorites from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('ghsFavorites', JSON.stringify(favorites));
    }, [favorites]);
    
    const toggleFavorite = (hymnNumber: number) => {
        setFavorites(prev => 
            prev.includes(hymnNumber)
                ? prev.filter(n => n !== hymnNumber)
                : [...prev, hymnNumber]
        );
    };

    const categories = useMemo(() => {
        const allCategories = allHymns.map(h => h.category);
        return ['All', 'Favorites', ...[...new Set(allCategories)].sort()];
    }, []);

    const filteredHymns = useMemo(() => {
        const lowercasedSearchTerm = ghsSearchTerm.toLowerCase();

        let sourceHymns = allHymns;
        if (activeCategory === 'Favorites') {
            const favoriteSet = new Set(favorites);
            sourceHymns = allHymns.filter(h => favoriteSet.has(h.number));
        } else if (activeCategory !== 'All') {
            sourceHymns = allHymns.filter(h => h.category === activeCategory);
        }
        
        if (!lowercasedSearchTerm) {
            return sourceHymns;
        }

        return sourceHymns.filter(hymn => 
            hymn.title.toLowerCase().includes(lowercasedSearchTerm) ||
            hymn.number.toString().includes(lowercasedSearchTerm) ||
            hymn.lyrics.join(' ').toLowerCase().includes(lowercasedSearchTerm)
        );
    }, [ghsSearchTerm, activeCategory, favorites]);
    
    const hymnOfTheDay = allHymns.find(h => h.number === 9);

    const handlePlayHymn = (hymn: Hymn) => {
        if (!hymn || !hymn.audioUrl) return;
        const track: AudioTrack = {
            type: 'hymn',
            title: `GHS ${hymn.number} - ${hymn.title}`,
            artist: 'DCLM Choir',
            url: hymn.audioUrl,
            artwork: `https://picsum.photos/seed/ghs${hymn.number}/200`
        };
        playTrack(track);
    };

    const handleSelectRecommendedHymn = (hymn: Hymn) => {
        setIsAiModalOpen(false);
        setSelectedHymn(hymn);
    };

    return (
        <div className="space-y-6">
             {selectedHymn && 
                <HymnDetailModal 
                    hymn={selectedHymn} 
                    onClose={() => setSelectedHymn(null)} 
                    onPlay={handlePlayHymn}
                    isFavorite={favorites.includes(selectedHymn.number)}
                    onToggleFavorite={toggleFavorite}
                />
            }
            <AiRecommenderModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                onSelectHymn={handleSelectRecommendedHymn}
            />
             <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Gospel Hymns & Songs</h1>
             
            {hymnOfTheDay && !ghsSearchTerm && (activeCategory === 'All' || activeCategory === hymnOfTheDay.category) && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Hymn of the Day</h2>
                            <h3 className="text-xl mb-1">GHS {hymnOfTheDay.number} - {hymnOfTheDay.title}</h3>
                            <p className="text-purple-200">Key: {hymnOfTheDay.key} • Category: {hymnOfTheDay.category}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button onClick={() => handlePlayHymn(hymnOfTheDay)} className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"><Volume2 size={20} className="inline mr-2" />Play Audio</button>
                            <button onClick={() => setSelectedHymn(hymnOfTheDay)} className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-400 transition-colors"><FileText size={20} className="inline mr-2" />Lyrics & Sheet</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg">
                <div className="space-y-4">
                     <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search by title, number, or lyrics..." 
                                value={ghsSearchTerm} 
                                onChange={(e) => setGhsSearchTerm(e.target.value)} 
                                className="w-full border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 rounded-full pl-11 pr-4 py-3" 
                            />
                        </div>
                        <Button variant="ghost" onClick={() => setIsAiModalOpen(true)} className="flex-shrink-0">
                            <Sparkles size={16} className="mr-2"/> AI Recommendations
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 md:-mx-6 px-4 md:px-6">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                                    activeCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {category === 'Favorites' && <Star size={12} className="inline mr-1.5 mb-0.5" />}
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 space-y-1">
                    {filteredHymns.length > 0 ? (
                        filteredHymns.map((hymn) => (
                           <button 
                                key={hymn.id} 
                                onClick={() => setSelectedHymn(hymn)} 
                                className="w-full text-left p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex-shrink-0 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300">
                                    {hymn.number}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{hymn.title}</p>
                                        {favorites.includes(hymn.number) && <Star size={14} className="text-yellow-500 fill-yellow-400 flex-shrink-0" />}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{hymn.category}</p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 col-span-full text-center py-8">
                            No hymns found matching your search.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hymns;