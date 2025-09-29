import React, { useState, useMemo, useEffect, useRef } from 'react';
import { bibleData } from '../data/bibleData';
import { readingPlansData } from '../data/readingPlans.ts';
import { Book, Chapter, Verse, BibleBookmark, BibleHighlight, BibleNote, AudioTrack, BibleVersion, ReadingPlan, DailyReading } from '../types';
import { generateBibleInsight } from '../services/geminiService';
import { Bookmark, MessageSquare, Share2, Palette, ChevronRight, X, ChevronLeft, Lightbulb, NotebookText, Star, Search as SearchIcon, Library, BookCopy, SlidersHorizontal, AudioLines, Columns, Check, BookOpen, Minus, Plus, CheckSquare } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';
import { useAudio } from '../context/AudioContext';

const usePersistentState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, state]);

    return [state, setState];
};

const Bible: React.FC = () => {
    type ViewState = 'left-panel' | 'chapters' | 'text';
    type LeftPanelTab = 'navigate' | 'search' | 'library' | 'plans' | 'planDetail';
    type StudyPanelTab = 'resources' | 'notes' | 'compare';

    const [viewState, setViewState] = useState<ViewState>('left-panel');
    const [leftPanelTab, setLeftPanelTab] = useState<LeftPanelTab>('navigate');
    const [studyPanelTab, setStudyPanelTab] = useState<StudyPanelTab>('resources');

    const [primaryVersion, setPrimaryVersion] = usePersistentState('bible_primary_version', 'KJV');
    const [secondaryVersion, setSecondaryVersion] = usePersistentState('bible_secondary_version', 'NIV');
    const [isParallelMode, setIsParallelMode] = usePersistentState('bible_parallel_mode', false);

    const [currentBible, setCurrentBible] = useState<BibleVersion>(bibleData.find(v => v.version === primaryVersion)!);
    const [parallelBible, setParallelBible] = useState<BibleVersion | undefined>(bibleData.find(v => v.version === secondaryVersion));

    const [selectedBook, setSelectedBook] = useState<Book>(currentBible.books.find(b => b.book === 'John') || currentBible.books[0]);
    const [selectedChapter, setSelectedChapter] = useState<Chapter>(selectedBook.chapters.find(c => c.chapter === 1) || selectedBook.chapters[0]);
    
    const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
    const [isStudyPanelOpen, setStudyPanelOpen] = usePersistentState('bible_study_panel_open', false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ book: string; chapter: number; verse: number; text: string; }[]>([]);

    const [activePlan, setActivePlan] = useState<ReadingPlan | null>(null);
    const [planProgress, setPlanProgress] = usePersistentState<Record<string, number[]>>('bible_plan_progress_v2', {});
    
    const [fontSize, setFontSize] = usePersistentState('bible_font_size', 1.125); // in rem
    const [isParagraphMode, setIsParagraphMode] = usePersistentState('bible_paragraph_mode', false);
    
    const { showToast } = useNotification();
    const { playTrack } = useAudio();
    
    const [bookmarks, setBookmarks] = usePersistentState<BibleBookmark[]>('bible_bookmarks_v2', []);
    const [highlights, setHighlights] = usePersistentState<BibleHighlight[]>('bible_highlights_v2', []);
    const [notes, setNotes] = usePersistentState<BibleNote[]>('bible_notes_v2', []);
    
    const readerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newBible = bibleData.find(v => v.version === primaryVersion)!;
        setCurrentBible(newBible);
        setParallelBible(bibleData.find(v => v.version === secondaryVersion));
        
        const newBook = newBible.books.find(b => b.book === selectedBook.book) || newBible.books[0];
        setSelectedBook(newBook);

        const newChapter = newBook.chapters.find(c => c.chapter === selectedChapter.chapter) || newBook.chapters[0];
        setSelectedChapter(newChapter);
    }, [primaryVersion, secondaryVersion]);
    
    const handleBookSelect = (book: Book) => {
        setSelectedBook(book);
        setSelectedChapter(book.chapters[0]);
        setSelectedVerse(null);
        setViewState('chapters');
    };
    
    const handleChapterSelect = (chapter: Chapter) => {
        setSelectedChapter(chapter);
        setSelectedVerse(null);
        setViewState('text');
        readerRef.current?.scrollTo(0, 0);
    };

    const handleReadingSelect = (reading: DailyReading) => {
        const book = currentBible.books.find(b => b.book === reading.book);
        if (book) {
            const chapter = book.chapters.find(c => c.chapter === reading.startChapter);
            if (chapter) {
                setSelectedBook(book);
                setSelectedChapter(chapter);
                setViewState('text');
                readerRef.current?.scrollTo(0, 0);
            } else {
                showToast(`Chapter ${reading.startChapter} not found in ${reading.book}.`, 'error');
            }
        } else {
            showToast(`Book "${reading.book}" not found in this version.`, 'error');
        }
    };

    const handleVerseSelect = (verse: Verse) => {
        setSelectedVerse(verse);
        if (!isStudyPanelOpen) {
            setStudyPanelOpen(true);
        }
    };

    const handleSearch = () => {
        if (searchQuery.length < 3) return;
        const results: { book: string; chapter: number; verse: number; text: string; }[] = [];
        const bibleToSearch = bibleData.find(b => b.version === primaryVersion) || bibleData[0];
        bibleToSearch.books.forEach(book => {
            book.chapters.forEach(chapter => {
                chapter.verses.forEach(verse => {
                    if (verse.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                        results.push({ book: book.book, chapter: chapter.chapter, verse: verse.verse, text: verse.text });
                    }
                });
            });
        });
        setSearchResults(results);
    };

    const createVerseKey = (book: string, chapter: number, verse: number) => `${book}-${chapter}-${verse}`;
    
    const personalizationMap = useMemo(() => {
        const map = new Map<string, { bookmark?: true; highlight?: string; note?: string }>();
        bookmarks.forEach(b => map.set(createVerseKey(b.book, b.chapter, b.verse), { ...map.get(createVerseKey(b.book, b.chapter, b.verse)), bookmark: true }));
        highlights.forEach(h => map.set(createVerseKey(h.book, h.chapter, h.verse), { ...map.get(createVerseKey(h.book, h.chapter, h.verse)), highlight: h.color }));
        notes.forEach(n => map.set(createVerseKey(n.book, n.chapter, n.verse), { ...map.get(createVerseKey(n.book, n.chapter, n.verse)), note: n.note }));
        return map;
    }, [bookmarks, highlights, notes]);

    const handlePlayAudio = () => {
        if (!selectedChapter.audioUrl) {
            showToast("Audio not available for this chapter.", "error");
            return;
        }
        const track: AudioTrack = {
            type: 'sermon',
            title: `${selectedBook.book} ${selectedChapter.chapter}`,
            artist: `${primaryVersion} Audio Bible`,
            url: selectedChapter.audioUrl,
            artwork: `https://avatar.iran.liara.run/public/boy?username=bible`
        };
        playTrack(track);
    };

    const LeftPanel = () => (
        <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out absolute md:relative z-30 h-full bg-white dark:bg-gray-800 ${viewState === 'left-panel' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                    {([['navigate', 'Navigate', BookOpen], ['search', 'Search', SearchIcon], ['library', 'Library', Library], ['plans', 'Plans', Check]] as const).map(([id, label, Icon]) => (
                        <button key={id} onClick={() => setLeftPanelTab(id)} className={`flex-1 flex justify-center items-center gap-2 p-1.5 text-sm font-semibold rounded-md transition-colors ${leftPanelTab === id ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'}`}>
                            <Icon size={16}/> <span className="hidden lg:inline">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {leftPanelTab === 'navigate' && currentBible.books.map(book => (
                    <button key={book.book} onClick={() => handleBookSelect(book)} className={`w-full text-left px-4 py-2.5 flex justify-between items-center ${selectedBook.book === book.book ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
                        {book.book} <ChevronRight size={16} />
                    </button>
                ))}
                {leftPanelTab === 'search' && (
                    <div className="p-4 space-y-3">
                        <div className="flex gap-2">
                            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Search scripture..." className="w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" />
                            <button onClick={handleSearch} className="p-2 bg-blue-600 text-white rounded-md"><SearchIcon size={20}/></button>
                        </div>
                        <div className="space-y-2 max-h-[calc(100vh-15rem)] overflow-y-auto">
                            {searchResults.map((r, i) => (
                                <div key={i} className="p-2 border-b border-gray-200 dark:border-gray-700">
                                    <p className="font-bold">{r.book} {r.chapter}:{r.verse}</p>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: r.text.replace(new RegExp(searchQuery, 'gi'), (match) => `<mark>${match}</mark>`) }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                 {leftPanelTab === 'library' && (
                     <div className="p-4 space-y-4">
                        <h3 className="text-lg font-bold">My Library</h3>
                        <div>
                            <h4 className="font-semibold text-blue-600">Bookmarks</h4>
                            {bookmarks.map(b => <p key={createVerseKey(b.book, b.chapter, b.verse)} className="text-sm p-1">{b.book} {b.chapter}:{b.verse}</p>)}
                        </div>
                         <div>
                            <h4 className="font-semibold text-green-600">Highlights</h4>
                            {highlights.map(h => <p key={createVerseKey(h.book, h.chapter, h.verse)} className="text-sm p-1 flex items-center gap-2"><span className={`w-3 h-3 rounded-full ${h.color}`}></span>{h.book} {h.chapter}:{h.verse}</p>)}
                        </div>
                        <div>
                            <h4 className="font-semibold text-purple-600">Notes</h4>
                            {notes.map(n => <p key={createVerseKey(n.book, n.chapter, n.verse)} className="text-sm p-1 truncate">{n.book} {n.chapter}:{n.verse} - {n.note}</p>)}
                        </div>
                    </div>
                )}
                 {leftPanelTab === 'plans' && <ReadingPlansList />}
                 {leftPanelTab === 'planDetail' && <PlanDetailView />}
            </div>
        </div>
    );

    const ReadingPlansList = () => (
        <div className="p-4 space-y-4">
            {readingPlansData.map(plan => {
                const completed = planProgress[plan.id]?.length || 0;
                const progress = (completed / plan.duration) * 100;
                return (
                    <div key={plan.id} onClick={() => { setActivePlan(plan); setLeftPanelTab('planDetail'); }} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md cursor-pointer">
                        <h4 className="font-bold">{plan.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{plan.description}</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-gray-500">{completed} / {plan.duration} days</p>
                    </div>
                );
            })}
        </div>
    );
    
    const PlanDetailView = () => {
        if (!activePlan) return null;

        const toggleDayComplete = (planId: string, day: number) => {
            setPlanProgress(prev => {
                const currentPlanDays = prev[planId] || [];
                const isCompleted = currentPlanDays.includes(day);
                const newPlanDays = isCompleted ? currentPlanDays.filter(d => d !== day) : [...currentPlanDays, day];
                return { ...prev, [planId]: newPlanDays };
            });
        };
        
        return (
            <div className="p-4">
                <button onClick={() => setLeftPanelTab('plans')} className="flex items-center gap-2 text-sm font-semibold mb-3"><ChevronLeft size={16} /> Back to Plans</button>
                <h3 className="text-lg font-bold">{activePlan.title}</h3>
                <div className="space-y-2 mt-3">
                    {activePlan.readings.map(reading => {
                        const isCompleted = planProgress[activePlan.id]?.includes(reading.day);
                        return (
                             <div key={reading.day} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                <button onClick={() => toggleDayComplete(activePlan.id, reading.day)} className="p-1">
                                    <CheckSquare size={20} className={isCompleted ? 'text-green-500 fill-current' : 'text-gray-400'} />
                                </button>
                                <div onClick={() => handleReadingSelect(reading)} className="cursor-pointer">
                                    <p className="font-semibold text-sm">Day {reading.day}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{reading.passage}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };

    const ChapterGrid = () => (
        <div className={`absolute md:relative w-full h-full md:w-1/3 lg:w-1/5 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out z-20 ${viewState === 'chapters' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setViewState('left-panel')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><ChevronLeft size={20} /></button>
                <h2 className="text-xl font-bold">{selectedBook.book}</h2>
            </div>
            <div className="overflow-y-auto flex-1 p-3">
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {selectedBook.chapters.map(chapter => (
                        <button key={chapter.chapter} onClick={() => handleChapterSelect(chapter)} className={`flex items-center justify-center aspect-square rounded-lg text-lg ${selectedChapter.chapter === chapter.chapter ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-blue-600' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                            {chapter.chapter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
    
    const ReadingView = () => {
        const parallelChapter = parallelBible?.books.find(b => b.book === selectedBook.book)?.chapters.find(c => c.chapter === selectedChapter.chapter);
        const [isSettingsOpen, setSettingsOpen] = useState(false);

        return (
            <div className={`absolute md:relative w-full h-full md:flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-transform duration-300 ease-in-out z-10 ${viewState === 'text' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
                <header className="p-2 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-between flex-shrink-0 z-10">
                    <div className="flex items-center gap-1">
                        <button onClick={() => setViewState('chapters')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"><ChevronLeft size={20} /></button>
                        <select value={primaryVersion} onChange={e => setPrimaryVersion(e.target.value)} className="font-bold bg-transparent border-0 focus:ring-0 text-sm md:text-base">
                            {bibleData.map(v => <option key={v.version}>{v.version}</option>)}
                        </select>
                    </div>
                    <h1 className="text-base md:text-lg font-bold text-center truncate">{selectedBook.book} {selectedChapter.chapter}</h1>
                     <div className="flex items-center gap-1">
                        <button onClick={handlePlayAudio} title="Listen to Chapter" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><AudioLines size={18} /></button>
                        <button onClick={() => setStudyPanelOpen(p => !p)} title="Study Panel" className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${isStudyPanelOpen ? 'text-blue-600' : ''}`}><Library size={18} /></button>
                        <div className="relative">
                            <button onClick={() => setSettingsOpen(s => !s)} title="Display Settings" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><SlidersHorizontal size={18} /></button>
                            {isSettingsOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border dark:border-gray-700 p-4 z-20">
                                    <p className="font-bold mb-2">Display Settings</p>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium">Font Size</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button onClick={() => setFontSize(s => Math.max(s - 0.125, 0.75))} className="p-1.5 border dark:border-gray-600 rounded-md"><Minus size={16}/></button>
                                                <span className="flex-1 text-center text-sm">{fontSize.toFixed(2)}rem</span>
                                                <button onClick={() => setFontSize(s => Math.min(s + 0.125, 2.0))} className="p-1.5 border dark:border-gray-600 rounded-md"><Plus size={16}/></button>
                                            </div>
                                        </div>
                                         <div className="flex items-center justify-between">
                                            <label htmlFor="paragraph-mode" className="text-sm font-medium">Paragraph Mode</label>
                                            <input id="paragraph-mode" type="checkbox" checked={isParagraphMode} onChange={e => setIsParagraphMode(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="parallel-mode" className="text-sm font-medium">Parallel Mode</label>
                                            <input id="parallel-mode" type="checkbox" checked={isParallelMode} onChange={e => setIsParallelMode(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        </div>
                                        {isParallelMode && (
                                            <select value={secondaryVersion} onChange={e => setSecondaryVersion(e.target.value)} className="w-full text-sm bg-transparent border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500">
                                                {bibleData.map(v => <option key={v.version}>{v.version}</option>)}
                                            </select>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <div ref={readerRef} className={`overflow-y-auto p-4 md:p-6 flex-1 grid ${isParallelMode ? 'grid-cols-2 gap-6' : 'grid-cols-1'}`} style={{fontSize: `${fontSize}rem`, lineHeight: isParagraphMode ? '1.8' : '1.6'}}>
                    {/* Primary Version Column */}
                    <div>
                        {!isParallelMode && <h1 className="text-2xl font-bold mb-4 md:hidden">{selectedBook.book} {selectedChapter.chapter}</h1>}
                        <div className={isParagraphMode ? '' : 'space-y-2'}>
                            {selectedChapter.verses.map(verse => {
                                const data = personalizationMap.get(createVerseKey(selectedBook.book, selectedChapter.chapter, verse.verse));
                                const verseClass = `cursor-pointer rounded-md transition-colors ${data?.highlight || ''} ${selectedVerse?.verse === verse.verse ? 'bg-blue-200/50 dark:bg-blue-900/40' : 'hover:bg-blue-100/50 dark:hover:bg-blue-900/20'}`;
                                return isParagraphMode ? (
                                    <span key={verse.verse} onClick={() => handleVerseSelect(verse)} className={verseClass}>
                                        <sup className="font-bold text-sm text-blue-600 dark:text-blue-400 mr-0.5 select-none">{verse.verse}</sup>
                                        <span>{verse.text}</span>{' '}
                                    </span>
                                ) : (
                                    <div key={verse.verse} onClick={() => handleVerseSelect(verse)} className={verseClass}>
                                        <sup className="font-bold text-sm text-blue-600 dark:text-blue-400 mr-1.5 select-none align-top">{verse.verse}</sup>
                                        <span className="inline-block">{verse.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Parallel Version Column */}
                    {isParallelMode && parallelChapter && (
                        <div className="border-l border-gray-300 dark:border-gray-600 pl-6">
                            <div className={isParagraphMode ? '' : 'space-y-2'}>
                                {parallelChapter.verses.map(verse => (
                                    isParagraphMode ? (
                                        <span key={verse.verse} className="cursor-pointer">
                                            <sup className="font-bold text-sm text-gray-500 mr-0.5 select-none">{verse.verse}</sup>
                                            <span>{verse.text}</span>{' '}
                                        </span>
                                    ) : (
                                        <div key={verse.verse} className="cursor-pointer">
                                            <sup className="font-bold text-sm text-gray-500 mr-1.5 select-none align-top">{verse.verse}</sup>
                                            <span className="inline-block">{verse.text}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const StudyPanel = () => {
        const [aiInsight, setAiInsight] = useState('');
        const [isAiLoading, setIsAiLoading] = useState(false);
        const [currentNoteText, setCurrentNoteText] = useState('');

        useEffect(() => {
            if (selectedVerse) {
                const verseKey = createVerseKey(selectedBook.book, selectedChapter.chapter, selectedVerse.verse);
                const verseNote = notes.find(n => createVerseKey(n.book, n.chapter, n.verse) === verseKey);
                setCurrentNoteText(verseNote?.note || '');
                setAiInsight('');
            }
        }, [selectedVerse]);

        const fetchAiInsight = async () => {
            if (!selectedVerse) return;
            setIsAiLoading(true);
            const prompt = `Provide a concise, pastor-focused commentary on ${selectedBook.book} ${selectedChapter.chapter}:${selectedVerse.verse} ("${selectedVerse.text}"). Include: 1. Key meaning. 2. Context. 3. Cross-references.`;
            const result = await generateBibleInsight(prompt);
            setAiInsight(result);
            setIsAiLoading(false);
        };

        const handleSaveNote = () => {
            if (!selectedVerse) return;
            const verseKey = createVerseKey(selectedBook.book, selectedChapter.chapter, selectedVerse.verse);
            const existingNoteIndex = notes.findIndex(n => createVerseKey(n.book, n.chapter, n.verse) === verseKey);
            if (currentNoteText.trim()) {
                const newNote: BibleNote = { ...selectedVerse, book: selectedBook.book, chapter: selectedChapter.chapter, note: currentNoteText };
                if (existingNoteIndex > -1) {
                    setNotes(prev => { const updated = [...prev]; updated[existingNoteIndex] = newNote; return updated; });
                } else {
                    setNotes(prev => [...prev, newNote]);
                }
                 showToast("Note saved!", "success");
            } else if (existingNoteIndex > -1) {
                setNotes(prev => prev.filter((_, index) => index !== existingNoteIndex));
                showToast("Note deleted.");
            }
        };

        return (
            <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl transition-transform duration-300 ease-in-out z-40 flex flex-col ${isStudyPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold">{selectedVerse ? `${selectedBook.book} ${selectedChapter.chapter}:${selectedVerse.verse}` : "Study Panel"}</h3>
                    <button onClick={() => setStudyPanelOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><X size={20} /></button>
                </div>
                {selectedVerse ? <>
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {([['resources', 'Resources'], ['notes', 'Notes'], ['compare', 'Compare']] as const).map(([id, label]) => (
                        <button key={id} onClick={() => setStudyPanelTab(id)} className={`flex-1 p-2 text-sm font-semibold ${studyPanelTab === id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>{label}</button>
                    ))}
                </div>
                 <div className="flex-1 overflow-y-auto p-4">
                    {studyPanelTab === 'resources' && (
                        <div className="space-y-4">
                            <h4 className="font-semibold">AI Insight</h4>
                            <button onClick={fetchAiInsight} disabled={isAiLoading} className="w-full p-2 bg-purple-600 text-white rounded-md text-sm flex items-center justify-center gap-2">
                                <Lightbulb size={16}/> {aiInsight ? 'Regenerate Insight' : 'Generate Insight'}
                            </button>
                            {isAiLoading && <p>Thinking...</p>}
                            {aiInsight && <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: aiInsight.replace(/\n/g, '<br />') }} />}
                        </div>
                    )}
                     {studyPanelTab === 'notes' && (
                        <div>
                            <textarea value={currentNoteText} onChange={e => setCurrentNoteText(e.target.value)} rows={10} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500" placeholder="Type your note here..." />
                            <button onClick={handleSaveNote} className="mt-2 w-full p-2 bg-blue-600 text-white rounded-md text-sm">Save Note</button>
                        </div>
                    )}
                    {studyPanelTab === 'compare' && (
                        <div className="space-y-3">
                            {bibleData.map(version => {
                                const verseText = version.books.find(b => b.book === selectedBook.book)?.chapters.find(c => c.chapter === selectedChapter.chapter)?.verses.find(v => v.verse === selectedVerse.verse)?.text;
                                return verseText ? (
                                    <div key={version.version}>
                                        <p className="font-bold text-sm">{version.version}</p>
                                        <p className="text-gray-700 dark:text-gray-300">{verseText}</p>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    )}
                </div></> : <div className="flex-1 flex items-center justify-center text-center text-gray-500 p-4">Select a verse to begin your study.</div> }
            </div>
        );
    };

    return (
        <div className="flex h-[calc(100vh-6.5rem)] bg-white dark:bg-black text-gray-900 dark:text-gray-50 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden relative font-sans">
            <LeftPanel />
            <ChapterGrid />
            <ReadingView />
            <StudyPanel />
        </div>
    );
};

export default Bible;
