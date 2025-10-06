
import React, { useState } from 'react';
// FIX: Import 'CheckCircle' and 'Lock' icons to resolve 'Cannot find name' errors.
import { BookOpen, Gamepad2, Palette, Youtube, Smile, Award, Star, Check, X, Wand2, ChevronLeft, Play, Users, Search, Brain, Trophy, Code, Ship, MoveLeft, Repeat, MoveUp, Trash2, Home, CheckCircle, Lock } from 'lucide-react';
import { bibleStories, bibleHeroes, dailyQuests, bibleVideos, bibleQuizzes, mockBadges, mockCodingQuests } from '../data/mockData';
import { BibleStory, BibleHero, BibleQuest, BibleVideo, Quiz, ActiveTab, BibleCharacterProfile, AvatarConfig, Badge, CodingQuest, CodeBlock, GridObject } from '../types';
import { useNotification } from '../hooks/useNotification';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { generateColoringPage, getBibleCharacterInfo } from '../services/geminiService';

type ChildView = 'dashboard' | 'adventures' | 'games' | 'create' | 'watch' | 'profile' | 'code_kingdom';

// --- AVATAR CREATOR COMPONENTS AND DATA ---
const skinColors = ['#f2d5b1', '#d8ae88', '#b48a62', '#8c613c', '#5a381a'];
const hairColors = ['#333333', '#8d4a29', '#e6a84f', '#606060', '#f2d49c'];
const shirtColors = ['#e53935', '#43a047', '#1e88e5', '#fdd835', '#8e24aa'];

const Hair1: React.FC<{color: string}> = ({color}) => <path d="M50 25 C 20 20, 20 50, 25 50 C 30 40, 70 40, 75 50 C 80 50, 80 20, 50 25 Z" fill={color} />;
const Hair2: React.FC<{color: string}> = ({color}) => <path d="M25 35 Q 50 15, 75 35 C 85 45, 80 60, 50 55 C 20 60, 15 45, 25 35 Z" fill={color} />;
const Hair3: React.FC<{color: string}> = ({color}) => <path d="M20 50 C 20 30, 80 30, 80 50 Q 50 55, 20 50 Z M 40 30 Q 50 20, 60 30 T 40 30 Z" fill={color} />;

const Eyes1 = () => <><circle cx="35" cy="55" r="5" fill="#333" /><circle cx="65" cy="55" r="5" fill="#333" /></>;
const Eyes2 = () => <>
  <path d="M30 55 C 35 50, 40 50, 45 55" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
  <path d="M60 55 C 65 50, 70 50, 75 55" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round"/>
</>;
const Eyes3 = () => <>
  <circle cx="35" cy="55" r="6" fill="#fff" stroke="#333" strokeWidth="2" /><circle cx="37" cy="55" r="2" fill="#333" />
  <circle cx="65" cy="55" r="6" fill="#fff" stroke="#333" strokeWidth="2" /><circle cx="67" cy="55" r="2" fill="#333" />
</>;

const Mouth1 = () => <path d="M40 75 Q 50 85, 60 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />;
const Mouth2 = () => <path d="M40 75 Q 50 80, 60 75" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />;
const Mouth3 = () => <path d="M40 78 C 45 72, 55 72, 60 78 Q 50 88, 40 78 Z" fill="#fff" stroke="#333" strokeWidth="2" />;

const avatarParts = {
    hair: [Hair1, Hair2, Hair3],
    eyes: [Eyes1, Eyes2, Eyes3],
    mouth: [Mouth1, Mouth2, Mouth3],
};

// --- HELPER & SUB-COMPONENTS ---
const StoryCard: React.FC<{ story: BibleStory }> = ({ story }) => (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-100/50 dark:border-gray-700/50 group cursor-pointer transition-transform hover:-translate-y-1">
        <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
            <img src={story.imageUrl} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className={`absolute inset-0 bg-gradient-to-t from-${story.color}-600/50 to-transparent`}></div>
        </div>
        <h3 className={`font-bold text-lg text-${story.color}-700 dark:text-${story.color}-400`}>{story.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{story.description}</p>
        <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2">
            <div className={`bg-${story.color}-500 h-2 rounded-full`} style={{ width: `${story.progress}%` }}></div>
        </div>
    </div>
);

const HeroCard: React.FC<{ hero: BibleHero }> = ({ hero }) => (
    <div className="flex flex-col items-center text-center">
        <img src={hero.avatarUrl} alt={hero.name} className="w-20 h-20 rounded-full border-4 border-white/50 dark:border-gray-800/50 shadow-md mb-2" />
        <p className="font-bold text-gray-800 dark:text-gray-200">{hero.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{hero.description}</p>
    </div>
);

const QuestItem: React.FC<{ quest: BibleQuest }> = ({ quest }) => (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${quest.isCompleted ? 'bg-green-50/50 dark:bg-green-900/30' : 'bg-gray-100/50 dark:bg-gray-700/50'}`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${quest.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300'}`}>
            <quest.icon size={20} />
        </div>
        <div>
            <p className={`font-semibold text-sm ${quest.isCompleted ? 'text-green-800 dark:text-green-300' : 'text-gray-700 dark:text-gray-200'}`}>{quest.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{quest.description}</p>
        </div>
    </div>
);

const BottomNavItem: React.FC<{ icon: React.ElementType; label: string; isActive: boolean; onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-transform duration-200 ${isActive ? 'text-blue-500 scale-110' : 'text-gray-400'}`}>
        <div className={`p-3 rounded-full transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`}>
            <Icon size={28} />
        </div>
        <span className="text-xs font-bold mt-1">{label}</span>
    </button>
);

const CharacterExplorerModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { showToast } = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [characterProfile, setCharacterProfile] = useState<BibleCharacterProfile | null>(null);

    const handleSearch = async (name?: string) => {
        const characterToSearch = name || searchTerm;
        if (!characterToSearch.trim()) {
            showToast('Please enter a name to search!', 'error');
            return;
        }

        setIsLoading(true);
        setCharacterProfile(null);

        try {
            const profile = await getBibleCharacterInfo(characterToSearch);
            setCharacterProfile(profile);
        } catch (error: any) {
            showToast(error.message || 'Something went wrong.', 'error');
        } finally {
            setIsLoading(false);
            setSearchTerm('');
        }
    };
    
    const popularCharacters = ["David", "Moses", "Esther", "Daniel", "Ruth", "Mary"];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-blue-50/80 dark:bg-gray-900/80 backdrop-blur-md z-50 p-4 md:p-8 overflow-y-auto font-sans" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif" }}>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 p-2 rounded-full shadow-md z-10"><X size={24}/></button>
            
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">Bible Character Explorer</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex gap-2 mb-4">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Who do you want to learn about?"
                        className="flex-1 w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading} size="lg" className="rounded-full !p-4"><Search size={20}/></Button>
                </form>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {popularCharacters.map(name => (
                        <button key={name} onClick={() => handleSearch(name)} className="px-4 py-2 text-sm bg-yellow-200 text-yellow-800 rounded-full hover:bg-yellow-300 transition-colors font-semibold">
                            {name}
                        </button>
                    ))}
                </div>

                <div className="min-h-[50vh] flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center text-gray-500">
                             <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
                             <p className="mt-4 text-xl font-semibold">Searching the Bible for you...</p>
                        </div>
                    ) : characterProfile ? (
                        <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <img src={characterProfile.imageUrl} alt={characterProfile.name} className="w-full aspect-square object-cover rounded-2xl shadow-lg border-4 border-white"/>
                                <div className="space-y-4">
                                    <h3 className="text-5xl font-extrabold text-blue-600 capitalize">{characterProfile.name}</h3>
                                    
                                    <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-lg">
                                        <h4 className="font-bold text-orange-800 dark:text-orange-300">Who Am I?</h4>
                                        <p className="text-sm text-orange-700 dark:text-orange-400">{characterProfile.summary}</p>
                                    </div>

                                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                                        <h4 className="font-bold text-green-800 dark:text-green-300">Fun Facts!</h4>
                                        <ul className="list-disc list-inside text-sm text-green-700 dark:text-green-400 space-y-1">
                                            {characterProfile.keyFacts.map((fact, i) => <li key={i}>{fact}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 bg-blue-100 dark:bg-blue-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-blue-800 dark:text-blue-300 text-lg mb-2">My Story in the Bible</h4>
                                <div className="space-y-2">
                                    {characterProfile.verses.map((v, i) => (
                                        <div key={i} className="bg-white/70 dark:bg-gray-700/50 p-2 rounded">
                                            <p className="font-semibold text-sm text-blue-700 dark:text-blue-400">{v.reference}</p>
                                            <p className="italic text-sm text-gray-600 dark:text-gray-300">"{v.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400">
                             <Users size={64} className="mx-auto" />
                            <p className="mt-2 font-semibold">Search for a Bible hero to learn about them!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MagicColoringModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const { showToast } = useNotification();
    const [prompt, setPrompt] = useState("David and Goliath");
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) {
            showToast('Please tell me what to draw!', 'error');
            return;
        }
        setIsLoading(true);
        setGeneratedImage(null);
        try {
            const base64String = await generateColoringPage(prompt);
            setGeneratedImage(base64String);
        } catch (error) {
            showToast('Oops! Could not create the drawing. Try another idea.', 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Modal show={isOpen} onClose={onClose} title="Magic Coloring Page Generator" size="lg">
            <div className="space-y-4 font-sans">
                <p className="text-sm text-gray-600 dark:text-gray-400">Describe a Bible story, and I'll draw a coloring page for you!</p>
                <div className="flex gap-2">
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Noah's ark with a rainbow"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleGenerate} disabled={isLoading}><Wand2 size={16} /></Button>
                </div>

                <div className="w-full aspect-square bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden">
                    {isLoading ? (
                         <div className="flex flex-col items-center justify-center text-gray-500">
                            <Wand2 size={48} className="animate-pulse" />
                            <p className="mt-2 text-sm font-medium">Drawing your picture...</p>
                         </div>
                    ) : generatedImage ? (
                        <img src={`data:image/png;base64,${generatedImage}`} alt="Generated coloring page" className="w-full h-full object-contain bg-white"/>
                    ) : (
                         <div className="text-center text-gray-400 p-4">
                            <p className="text-sm">Your magic drawing will appear here!</p>
                        </div>
                    )}
                </div>
                 <Button className="w-full" disabled={!generatedImage}>Start Coloring</Button>
            </div>
        </Modal>
    );
};

const AvatarPreview: React.FC<{config: AvatarConfig, size?: number}> = ({ config, size=128 }) => {
    const { hairStyle, hairColor, eyeStyle, mouthStyle, skinColor, shirtColor } = config;
    const Hair = avatarParts.hair[hairStyle];
    const Eyes = avatarParts.eyes[eyeStyle];
    const Mouth = avatarParts.mouth[mouthStyle];

    return (
        <div style={{ width: size, height: size }}>
            <svg viewBox="0 0 100 120" className="w-full h-full">
                <rect y="80" width="100" height="40" rx="5" fill={shirtColor} />
                <circle cx="50" cy="60" r="30" fill={skinColor} />
                <Hair color={hairColor} />
                <Eyes />
                <Mouth />
            </svg>
        </div>
    );
};

const AvatarCreatorModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    currentConfig: AvatarConfig;
    onSave: (config: AvatarConfig) => void;
}> = ({ isOpen, onClose, currentConfig, onSave }) => {
    const [config, setConfig] = useState(currentConfig);

    const OptionButton: React.FC<{onClick: () => void, children: React.ReactNode, isSelected: boolean}> = ({onClick, children, isSelected}) => (
        <button onClick={onClick} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isSelected ? 'ring-4 ring-blue-500' : 'ring-2 ring-transparent'}`}>
            {children}
        </button>
    );

    return (
        <Modal show={isOpen} onClose={onClose} title="Create Your Avatar" size="2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                <div className="md:col-span-1 flex flex-col items-center">
                    <AvatarPreview config={config} size={200}/>
                    <Button onClick={() => onSave(config)} className="mt-4 w-full">Save Avatar</Button>
                </div>
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <h4 className="font-bold mb-2">Skin Tone</h4>
                        <div className="flex flex-wrap gap-2">
                           {skinColors.map(color => <OptionButton key={color} onClick={() => setConfig({...config, skinColor: color})} isSelected={config.skinColor === color}><div className="w-8 h-8 rounded-full" style={{backgroundColor: color}}></div></OptionButton>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Hair Style & Color</h4>
                        <div className="flex flex-wrap gap-2">
                           {avatarParts.hair.map((_, index) => <OptionButton key={index} onClick={() => setConfig({...config, hairStyle: index})} isSelected={config.hairStyle === index}> <svg viewBox="0 0 100 100" className="w-8 h-8"><Hair1 color="#333" /></svg> </OptionButton>)}
                        </div>
                         <div className="flex flex-wrap gap-2 mt-2">
                           {hairColors.map(color => <OptionButton key={color} onClick={() => setConfig({...config, hairColor: color})} isSelected={config.hairColor === color}><div className="w-8 h-8 rounded-full" style={{backgroundColor: color}}></div></OptionButton>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold mb-2">Eyes</h4>
                        <div className="flex flex-wrap gap-2">
                           {avatarParts.eyes.map((_, index) => <OptionButton key={index} onClick={() => setConfig({...config, eyeStyle: index})} isSelected={config.eyeStyle === index}><svg viewBox="20 40 60 30" className="w-8 h-8"><Eyes1 /></svg></OptionButton>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Shirt Color</h4>
                        <div className="flex flex-wrap gap-2">
                           {shirtColors.map(color => <OptionButton key={color} onClick={() => setConfig({...config, shirtColor: color})} isSelected={config.shirtColor === color}><div className="w-8 h-8 rounded-full" style={{backgroundColor: color}}></div></OptionButton>)}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

// --- MAIN COMPONENT ---
interface ChildrenProps {
    setActiveTab: (tab: ActiveTab) => void;
}

const defaultAvatar: AvatarConfig = {
    hairStyle: 0,
    hairColor: '#333333',
    eyeStyle: 0,
    mouthStyle: 0,
    skinColor: '#f2d5b1',
    shirtColor: '#1e88e5',
};

// FIX: Changed to a named export to match the corrected import in App.tsx
export const Children: React.FC<ChildrenProps> = ({ setActiveTab }) => {
    const { showToast } = useNotification();
    const [activeView, setActiveView] = useState<ChildView>('dashboard');
    const [isExplorerOpen, setIsExplorerOpen] = useState(false);

    // Gamification State
    const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatar);
    const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(() => mockBadges.filter(b => b.unlocked).map(b => b.id));
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    
    // Coding state
    const [activeQuest, setActiveQuest] = useState<CodingQuest | null>(null);
    const [codingQuests, setCodingQuests] = useState<CodingQuest[]>(mockCodingQuests);

    const unlockBadge = (badgeId: string) => {
        if (!unlockedBadgeIds.includes(badgeId)) {
            setUnlockedBadgeIds(prev => [...prev, badgeId]);
            const badge = mockBadges.find(b => b.id === badgeId);
            showToast(`Badge Unlocked: ${badge?.title}!`, 'success');
        }
    };
    
    const handleQuestComplete = (questId: string, badgeId?: string) => {
        setCodingQuests(quests => quests.map(q => q.id === questId ? {...q, isCompleted: true} : q));
        if (badgeId) {
            unlockBadge(badgeId);
        }
    }

    const handleSaveAvatar = (newConfig: AvatarConfig) => {
        setAvatarConfig(newConfig);
        setIsAvatarModalOpen(false);
        showToast("Avatar saved!", 'success');
    };

    // --- Sub-Pages (moved inside main component for scope access) ---
    // FIX: Moved all view components inside the main Children component to give them access to its state, props, and handlers. This resolves all scope-related errors.
    
    const AdventuresView: React.FC<{ onOpenExplorer: () => void }> = ({ onOpenExplorer }) => (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BookOpen className="text-orange-500"/> Bible Adventures</h2>
                <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl p-6 mb-6 text-white shadow-lg text-center cursor-pointer hover:scale-105 transition-transform" onClick={onOpenExplorer}>
                    <Users size={48} className="mx-auto mb-2"/>
                    <h3 className="text-2xl font-bold">Bible Character Explorer</h3>
                    <p>Search for your favorite Bible heroes!</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bibleStories.map(story => <StoryCard key={story.id} story={story} />)}
                </div>
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Award className="text-yellow-500"/> Meet the Bible Heroes</h2>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                        {bibleHeroes.map(hero => <HeroCard key={hero.id} hero={hero} />)}
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Star className="text-red-500"/> Daily Quests</h2>
                    <div className="space-y-3">
                        {dailyQuests.map(quest => <QuestItem key={quest.id} quest={quest} />)}
                    </div>
                </section>
            </div>
        </div>
    );

    const GamesView: React.FC<{ unlockBadge: (id: string) => void }> = ({ unlockBadge }) => {
        const quiz: Quiz = bibleQuizzes[0];
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [score, setScore] = useState(0);
        const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
        const [showResult, setShowResult] = useState(false);
        const [quizCompleted, setQuizCompleted] = useState(false);
    
        const question = quiz.questions[currentQuestionIndex];
    
        const handleAnswer = (answer: string) => {
            setSelectedAnswer(answer);
            setShowResult(true);
            if (answer === question.correctAnswer) {
                setScore(s => s + 1);
                showToast('Correct! Great job!', 'success');
            } else {
                showToast('Not quite, try the next one!', 'error');
            }
    
            setTimeout(() => {
                setShowResult(false);
                setSelectedAnswer(null);
                if (currentQuestionIndex < quiz.questions.length - 1) {
                    setCurrentQuestionIndex(i => i + 1);
                } else {
                    setQuizCompleted(true);
                    const finalScore = score + (answer === question.correctAnswer ? 1 : 0);
                    if (finalScore === quiz.questions.length) {
                        unlockBadge(quiz.badgeIdToUnlock);
                    }
                }
            }, 2000);
        };
    
        const restartQuiz = () => {
            setQuizCompleted(false);
            setCurrentQuestionIndex(0);
            setScore(0);
        };
    
        if (quizCompleted) {
            const isPerfect = score === quiz.questions.length;
            return (
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-yellow-500">Quiz Complete!</h2>
                    <p className="text-lg mt-2">Your score:</p>
                    <p className="text-6xl font-extrabold my-4">{score} / {quiz.questions.length}</p>
                    {isPerfect && (
                        <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                            <p className="font-bold text-green-700 dark:text-green-300">AMAZING! You got a perfect score!</p>
                            <p className="text-sm text-green-600 dark:text-green-400">You've unlocked the "Quiz Whiz" badge!</p>
                        </div>
                    )}
                    <Button onClick={restartQuiz} size="lg" className="mt-6">Play Again</Button>
                </div>
            )
        }
    
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Gamepad2 className="text-purple-500"/> {quiz.title}</h2>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-2xl mx-auto text-center">
                    <p className="text-sm font-semibold text-gray-500">Question {currentQuestionIndex + 1} of {quiz.questions.length} | Score: {score}</p>
                    <p className="text-xl font-bold my-4 min-h-[3em]">{question.question}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {question.options.map(option => {
                            const isCorrect = option === question.correctAnswer;
                            const isSelected = option === selectedAnswer;
                            let buttonClass = 'bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200/50';
                            if (showResult) {
                                if (isCorrect) buttonClass = 'bg-green-500 text-white animate-bounce';
                                else if (isSelected && !isCorrect) buttonClass = 'bg-red-500 text-white';
                                else buttonClass = 'bg-gray-200 dark:bg-gray-700 opacity-50';
                            }
                            
                            return (
                                <button key={option} onClick={() => handleAnswer(option)} disabled={showResult} className={`p-4 rounded-lg font-bold text-lg transition-all duration-300 transform-gpu ${buttonClass}`}>
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const CreateView: React.FC = () => {
        const [isAiModalOpen, setIsAiModalOpen] = useState(false);
        return(
            <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Palette className="text-green-500"/> Coloring Book</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onClick={() => setIsAiModalOpen(true)} className="aspect-square bg-purple-100/50 dark:bg-purple-900/50 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-purple-600 dark:text-purple-300 hover:bg-purple-200/50 transition-colors">
                        <Wand2 size={48}/>
                        <p className="font-bold mt-2">Magic Coloring Page</p>
                    </button>
                    {/* Placeholder coloring pages */}
                    <div className="aspect-square bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-2"><div className="w-full h-full bg-gray-100/50 dark:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400">Creation</div></div>
                    <div className="aspect-square bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-2"><div className="w-full h-full bg-gray-100/50 dark:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400">Noah's Ark</div></div>
                     <div className="aspect-square bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-2"><div className="w-full h-full bg-gray-100/50 dark:bg-gray-600/50 rounded-lg flex items-center justify-center text-gray-400">Jonah & Fish</div></div>
                </div>
                <MagicColoringModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
            </div>
        );
    };

    const WatchView: React.FC = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Youtube className="text-red-500"/> Watch & Sing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bibleVideos.map(video => (
                     <div key={video.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-gray-100/50 dark:border-gray-700/50 group cursor-pointer">
                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                    <Play size={32} className="text-white ml-1" />
                                </div>
                            </div>
                            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">{video.duration}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">{video.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );

    const ProfileView: React.FC<{
        avatarConfig: AvatarConfig;
        onCustomize: () => void;
        unlockedBadgeIds: string[];
    }> = ({ avatarConfig, onCustomize, unlockedBadgeIds }) => {
    
        return (
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Smile className="text-yellow-500"/> My Stuff</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col items-center">
                    <AvatarPreview config={avatarConfig} size={128} />
                    <p className="text-xl font-bold mt-2">David</p>
                    <Button onClick={onCustomize} className="mt-2" size="sm">Customize Avatar</Button>
                </div>
                 <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                    <h3 className="font-bold text-lg mb-3">My Badges</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {mockBadges.map(badge => {
                            const isUnlocked = unlockedBadgeIds.includes(badge.id);
                            return (
                                <div key={badge.id} title={badge.criteria} className={`flex flex-col items-center text-center p-3 rounded-lg ${isUnlocked ? 'bg-yellow-50/50 dark:bg-yellow-900/30' : 'bg-gray-100/50 dark:bg-gray-700/50 opacity-60'}`}>
                                    <div className={`p-3 rounded-full ${isUnlocked ? 'bg-yellow-400 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                        <badge.icon size={28} />
                                    </div>
                                    <p className="font-semibold text-sm mt-2">{badge.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>);
    };

    const QuestView: React.FC<{
        quest: CodingQuest;
        onBack: () => void;
        onComplete: (questId: string, badgeId?: string) => void;
    }> = ({ quest, onBack, onComplete }) => {
        const [program, setProgram] = useState<CodeBlock[]>([]);
        const [grid, setGrid] = useState<GridObject[]>(quest.initialGrid);
        const [isAnimating, setIsAnimating] = useState(false);
    
        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            const blockId = e.dataTransfer.getData("blockId");
            const block = quest.availableBlocks.find(b => b.id === blockId);
            if (block) {
                setProgram(p => [...p, block]);
            }
        };
    
        const handleRun = () => {
            setIsAnimating(true);
            // Simplified check. Real version would run simulation and check final state.
            if (program.map(p => p.id).join(',') === quest.solution.join(',')) {
                setTimeout(() => {
                    showToast("Great job! You solved it!", 'success');
                    onComplete(quest.id, quest.badgeIdToUnlock);
                    onBack();
                }, 1000);
            } else {
                setTimeout(() => {
                    showToast("Not quite right. Try again!", 'error');
                    setIsAnimating(false);
                }, 1000);
            }
        };
        
        return (
            <div className="space-y-4">
                <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"><ChevronLeft/> Back to Quests</button>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold">{quest.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{quest.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-lg">
                        <h4 className="font-bold mb-2">Code Blocks</h4>
                        <div className="space-y-2">
                            {quest.availableBlocks.map(block => (
                                <div key={block.id} draggable onDragStart={e => e.dataTransfer.setData("blockId", block.id)} className="flex items-center gap-2 p-2 bg-yellow-400 text-yellow-900 rounded-md cursor-grab active:cursor-grabbing font-semibold">
                                    <block.icon size={16} /> {block.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 grid grid-rows-2 gap-4">
                         <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-lg min-h-[150px]">
                            <h4 className="font-bold mb-2">Your Program</h4>
                            <div className="space-y-1">
                                {program.map((block, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-yellow-200 text-yellow-800 rounded-md font-semibold">{block.label}</div>
                                ))}
                            </div>
                        </div>
                         <div className="bg-blue-200/50 dark:bg-blue-900/50 backdrop-blur-sm p-4 rounded-xl shadow-lg relative" style={{ display: 'grid', gridTemplateColumns: `repeat(${quest.gridSize}, 1fr)`, gridTemplateRows: `repeat(${quest.gridSize}, 1fr)`}}>
                             {grid.map(obj => {
                                const Icon = obj.icon;
                                return <div key={obj.id} className="flex items-center justify-center text-3xl" style={{ gridColumn: obj.x + 1, gridRow: obj.y + 1 }}>{typeof Icon === 'string' ? Icon : <Icon />}</div>
                             })}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setProgram([])} disabled={isAnimating}><Trash2 className="mr-2"/>Clear</Button>
                    <Button onClick={handleRun} disabled={isAnimating} className="!bg-green-600 hover:!bg-green-700"><Play className="mr-2"/>Run</Button>
                </div>
            </div>
        );
    };

    const CodeKingdomView: React.FC<{ 
        quests: CodingQuest[]; 
        onSelectQuest: (quest: CodingQuest) => void;
    }> = ({ quests, onSelectQuest }) => (
        <div className="space-y-8">
            <div className="text-center">
                <Code size={48} className="mx-auto text-green-600 dark:text-green-400" />
                <h1 className="text-3xl font-bold mt-2">Code Kingdom</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Learn to code by solving puzzles from the Bible!</p>
            </div>
    
            <div className="space-y-4 max-w-2xl mx-auto">
                {quests.map((quest, index) => {
                    const isUnlocked = index === 0 || quests[index - 1].isCompleted;
                    return (
                        <button 
                            key={quest.id}
                            onClick={() => isUnlocked && onSelectQuest(quest)}
                            disabled={!isUnlocked}
                            className={`w-full text-left p-4 rounded-2xl shadow-lg border-l-8 transition-all duration-300 transform-gpu ${
                                isUnlocked ? 'border-green-500 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md hover:-translate-y-1' : 'border-gray-300 dark:border-gray-600 bg-gray-100/50 dark:bg-gray-800/30 opacity-70 cursor-not-allowed'
                            }`}
                        >
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{quest.bibleStory}</p>
                                    <h3 className="text-xl font-bold">{quest.title}</h3>
                                </div>
                                {quest.isCompleted ? <CheckCircle className="text-green-500" size={28}/> : !isUnlocked ? <Lock size={24}/> : <Play size={24}/>}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const FeatureCard: React.FC<{title: string; icon: React.ElementType; color: string; onClick: () => void;}> = ({title, icon: Icon, color, onClick}) => (
        <button onClick={onClick} className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-3xl shadow-lg text-center transition-transform hover:-translate-y-2 border-b-8 border-${color}-500`}>
            <Icon size={48} className={`mx-auto text-${color}-500`} />
            <p className="font-bold text-lg mt-3">{title}</p>
        </button>
    );

    const DashboardView: React.FC<{setActiveView: (view: ChildView) => void}> = ({setActiveView}) => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             <FeatureCard title="Bible Adventures" icon={BookOpen} color="orange" onClick={() => setActiveView('adventures')} />
             <FeatureCard title="Code Kingdom" icon={Code} color="green" onClick={() => setActiveView('code_kingdom')} />
             <FeatureCard title="Bible Games" icon={Gamepad2} color="purple" onClick={() => setActiveView('games')} />
             <FeatureCard title="Coloring Book" icon={Palette} color="pink" onClick={() => setActiveView('create')} />
             <FeatureCard title="Watch & Sing" icon={Youtube} color="red" onClick={() => setActiveView('watch')} />
             <FeatureCard title="My Stuff" icon={Smile} color="yellow" onClick={() => setActiveView('profile')} />
        </div>
    );

    const renderContent = () => {
        if (activeQuest) {
            return <QuestView quest={activeQuest} onBack={() => setActiveQuest(null)} onComplete={handleQuestComplete} />;
        }
        switch (activeView) {
            case 'dashboard': return <DashboardView setActiveView={setActiveView} />;
            case 'adventures': return <AdventuresView onOpenExplorer={() => setIsExplorerOpen(true)} />;
            case 'code_kingdom': return <CodeKingdomView quests={codingQuests} onSelectQuest={setActiveQuest} />;
            case 'games': return <GamesView unlockBadge={unlockBadge} />;
            case 'create': return <CreateView />;
            case 'watch': return <WatchView />;
            case 'profile': return <ProfileView avatarConfig={avatarConfig} onCustomize={() => setIsAvatarModalOpen(true)} unlockedBadgeIds={unlockedBadgeIds} />;
            default: return <AdventuresView onOpenExplorer={() => setIsExplorerOpen(true)} />;
        }
    };

    return (
        <div className="h-screen flex flex-col font-sans" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif" }}>
             <header className="flex items-center justify-between p-4 flex-shrink-0">
                <button onClick={() => setActiveTab('dashboard')} className="flex items-center gap-2 text-sm font-semibold bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow">
                    <ChevronLeft size={16} /> Back to Main App
                </button>
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Bible Adventures</h1>
            </header>
            
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
                {renderContent()}
            </main>
            
            <CharacterExplorerModal isOpen={isExplorerOpen} onClose={() => setIsExplorerOpen(false)} />

            <AvatarCreatorModal 
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                currentConfig={avatarConfig}
                onSave={handleSaveAvatar}
            />

            <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-around max-w-lg mx-auto">
                    <BottomNavItem icon={Home} label="Home" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                    <BottomNavItem icon={BookOpen} label="Adventures" isActive={activeView === 'adventures'} onClick={() => setActiveView('adventures')} />
                    <BottomNavItem icon={Code} label="Coding" isActive={activeView === 'code_kingdom'} onClick={() => setActiveView('code_kingdom')} />
                    <BottomNavItem icon={Gamepad2} label="Games" isActive={activeView === 'games'} onClick={() => setActiveView('games')} />
                    <BottomNavItem icon={Smile} label="My Stuff" isActive={activeView === 'profile'} onClick={() => setActiveView('profile')} />
                </div>
            </footer>
        </div>
    );
};

// FIX: Change to a named export as 'default' is not used.
// export default Children;
