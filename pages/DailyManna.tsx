import React, { useState, useEffect, useMemo } from 'react';
import { devotionalArchive } from '../data/devotionalData';
import { generateDailyMannaPrayer, generateDiscussionPoints } from '../services/geminiService';
import { BookOpen, Volume2, Share2, Sparkles, Feather, Calendar, Search, ChevronLeft, ChevronRight, Bookmark, NotebookText, Brain, X } from 'lucide-react';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { Devotional, AudioTrack } from '../types';
import { useNotification } from '../hooks/useNotification';
import { useAudio } from '../context/AudioContext';

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const CalendarView: React.FC<{
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    selectedDate: Date;
}> = ({ currentDate, setCurrentDate, setSelectedDate, selectedDate }) => {
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();

    const changeMonth = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><ChevronLeft size={20} /></button>
                <div className="font-bold">{monthName} {year}</div>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><ChevronRight size={20} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const thisDate = new Date(year, currentDate.getMonth(), day + 1);
                    const isSelected = formatDate(thisDate) === formatDate(selectedDate);
                    return (
                        <button 
                            key={day} 
                            onClick={() => setSelectedDate(thisDate)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                                isSelected 
                                ? 'bg-blue-600 text-white' 
                                : 'hover:bg-blue-100 dark:hover:bg-blue-900/50'
                            }`}
                        >
                            {day + 1}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};


const DailyManna: React.FC = () => {
    const { showToast } = useNotification();
    const { playTrack } = useAudio();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [currentDevotional, setCurrentDevotional] = useState<Devotional | null>(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [notes, setNotes] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);

    const [modalContent, setModalContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        const dateString = formatDate(selectedDate);
        let foundDevotional = devotionalArchive.find(d => d.date === dateString);
        
        if (searchTerm) {
            const results = devotionalArchive.filter(d => 
                d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.content.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.keyVerse.toLowerCase().includes(searchTerm.toLowerCase())
            );
            foundDevotional = results[0] || null; // show first result
        }

        setCurrentDevotional(foundDevotional);
        setNotes(''); // Clear notes when devotional changes
    }, [selectedDate, searchTerm]);
    
    const handlePlayDevotional = () => {
        if (!currentDevotional || !currentDevotional.audioUrl) return;
        const track: AudioTrack = {
            type: 'devotional',
            title: `Daily Manna: ${currentDevotional.title}`,
            artist: 'DCLM',
            url: currentDevotional.audioUrl,
            artwork: `https://picsum.photos/seed/manna${currentDevotional.date}/200`
        };
        playTrack(track);
    };

    const handleAIGeneration = async (type: 'prayer' | 'discussion') => {
        if (!currentDevotional) return;

        setModalTitle(type === 'prayer' ? 'AI Generated Prayer' : 'AI Discussion Points');
        setModalOpen(true);
        setModalContent('');
        setIsLoading(true);

        const devotionalText = `${currentDevotional.title}\n${currentDevotional.content.join('\n')}`;
        const result = type === 'prayer' 
            ? await generateDailyMannaPrayer(devotionalText)
            : await generateDiscussionPoints(devotionalText);
        
        setModalContent(result);
        setIsLoading(false);
    };

    const toggleFavorite = () => {
        if (!currentDevotional) return;
        const isFavorite = favorites.includes(currentDevotional.title);
        if (isFavorite) {
            setFavorites(favs => favs.filter(t => t !== currentDevotional.title));
            showToast('Removed from favorites.');
        } else {
            setFavorites(favs => [...favs, currentDevotional.title]);
            showToast('Added to favorites!');
        }
    };
    
    const isCurrentFavorite = useMemo(() => {
        return currentDevotional ? favorites.includes(currentDevotional.title) : false;
    }, [favorites, currentDevotional]);

    const formattedDate = currentDevotional 
        ? new Date(currentDevotional.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : 'No devotional found for this date.';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 flex items-center justify-center lg:justify-start gap-3">
                        <Feather className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        Daily Manna
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Your Daily Dose of Spiritual Nourishment</p>
                </div>

                {currentDevotional ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2"><Calendar size={14}/> {formattedDate}</p>
                            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-50 mt-2">{currentDevotional.title}</h2>
                        </div>

                        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Key Verse:</p>
                            <p className="italic text-gray-700 dark:text-gray-300">{currentDevotional.keyVerse}</p>
                        </div>
                        
                        <article className="prose prose-lg max-w-none dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Read: <span className="font-normal">{currentDevotional.passage}</span></p>
                            {currentDevotional.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </article>

                        <div className="mt-8 pt-6 border-t border-dashed border-gray-300 dark:border-gray-600 text-center">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Thought for the day:</p>
                            <p className="text-xl italic text-blue-700 dark:text-blue-300 font-medium">{currentDevotional.thought}</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center h-96 flex flex-col justify-center items-center">
                         <Calendar size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                         <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">No Devotional Available</h3>
                         <p className="text-gray-500 dark:text-gray-400">
                            {searchTerm ? 'No results found for your search.' : 'Please select a different date or clear your search.'}
                         </p>
                    </div>
                )}
                
                 <div className="flex items-center justify-center flex-wrap gap-2">
                    <Button variant="ghost" onClick={handlePlayDevotional} disabled={!currentDevotional?.audioUrl}>
                        <Volume2 size={16} className="mr-2" /> Listen
                    </Button>
                    <Button variant="ghost"><BookOpen size={16} className="mr-2" /> Read Passage</Button>
                    <Button variant="ghost"><Share2 size={16} className="mr-2" /> Share</Button>
                    <Button onClick={toggleFavorite} variant={isCurrentFavorite ? "primary" : "ghost"} disabled={!currentDevotional}>
                        <Bookmark size={16} className={`mr-2 ${isCurrentFavorite ? 'fill-current' : ''}`} /> 
                        {isCurrentFavorite ? 'Favorited' : 'Favorite'}
                    </Button>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                <div className="relative">
                     <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input 
                        type="text" 
                        placeholder="Search devotionals..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                     />
                </div>

                <CalendarView currentDate={calendarDate} setCurrentDate={setCalendarDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold flex items-center gap-2 mb-2"><Sparkles size={18} className="text-purple-500" />AI Study Tools</h3>
                    <div className="flex flex-col space-y-2">
                        <Button onClick={() => handleAIGeneration('prayer')} className="w-full justify-start" variant="ghost" disabled={!currentDevotional}><Sparkles size={16} className="mr-2" /> Generate Prayer</Button>
                        <Button onClick={() => handleAIGeneration('discussion')} className="w-full justify-start" variant="ghost" disabled={!currentDevotional}><Brain size={16} className="mr-2" /> Discussion Points</Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="font-bold flex items-center gap-2 mb-2"><NotebookText size={18} className="text-green-500" /> My Notes</h3>
                    <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Your reflections on today's reading..." 
                        className="w-full h-28 p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700/50 text-sm"
                    />
                </div>

                {favorites.length > 0 && (
                     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h3 className="font-bold flex items-center gap-2 mb-2"><Bookmark size={18} className="text-yellow-500" /> My Favorites</h3>
                        <ul className="space-y-1">
                            {favorites.map(title => (
                                <li key={title} className="text-sm text-gray-700 dark:text-gray-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer">{title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

             <Modal show={isModalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
                <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-1 min-h-[10rem]">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-700"></div>
                        </div>
                    ) : (
                        <div className="prose prose-base max-w-none dark:prose-invert">
                           {modalContent.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default DailyManna;