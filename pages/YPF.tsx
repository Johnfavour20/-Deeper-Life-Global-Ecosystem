import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Music, FileText, Volume2, Search, X, Star, Plus, Minus, Sparkles, GraduationCap, ChevronLeft, Award, Trophy, Shield, Feather, Gem, ClipboardCheck, Lock, Edit, CheckCircle, Medal, Mic, Piano, Play, Pause, Power, ChevronsRight, Headphones, Book, Check, Timer, Users, Megaphone } from 'lucide-react';
import { ActiveTab, Hymn } from '../types';
import { useNotification } from '../hooks/useNotification';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';


// --- MUSIC ACADEMY DATA & COMPONENTS (MOVED FROM HYMNS.TSX) ---

const theoryQuestions = [
    { id: 'tq1', question: 'How many beats does a quarter note receive in 4/4 time?', options: ['1', '2', '4', '1/2'], answer: '1' },
    { id: 'tq2', question: 'What does the top number in a time signature (e.g., 3/4) tell you?', options: ['How many beats are in a measure', 'What kind of note gets one beat', 'How many measures are in the song'], answer: 'How many beats are in a measure' },
];
const sightReadingExercises = [
    { id: 'srq1', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTAwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMCAzMEgyMDAtMTAgNDBIMjAwLTEwIDUwSDIwMC0xMCA2MEgyMDAtMTAgNzBIMjAwIi8+PC9nPjxnIGZpbGw9ImJsYWNrIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjYwIiByPSI1Ii8+PHBhdGggZD0iTTQ1IDYwVjQwIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI1Ii8+PHBhdGggZD0iTTg1IDUwVjMwIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI0MCIgciA9IjUiLz48cGF0aCBkPSJNMTI1IDQwVjIwIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+', question: 'What is the first note shown?', options: ['C', 'E', 'F', 'G'], answer: 'E' }
];
const keySignatureQuestions = [
    { id: 'ksq1', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMCAzMEg5MCBNMTAgNDBIOTAgTTEwIDUwSDkwIE0xMCA2MEg5MCBNMTAgNzBIOTAiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAsIDApIj48cGF0aCBkPSJtMTIgMzUgdiAzME0xMiAzNSBjIDUgLTggMTUgLTggMTUgMGwtMTUgMzBjLTUgOCAtMTUgOCAtMTUgMFoiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0iYmxhY2siLz48L2c+PC9zdmc+', question: 'What is the key for this signature?', options: ['C Major', 'G Major', 'D Major', 'F Major'], answer: 'G Major' },
    { id: 'ksq2', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMCAzMEg5MCBNMTAgNDBIOTAgTTEwIDUwSDkwIE0xMCA2MEg5MCBNMTAgNzBIOTAiLz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAsIDApIj48cGF0aCBkPSJNMjIgNjUgdiAtMzBNMjIgNjUgYyAtNSAtOCAtMTUgLTggLTE1MGwwIDE1IC0zMGMyIDUgMTIgNSAxNSAweiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJibGFjayIvPjwvZz48L3N2Zz4=', question: 'What is the key for this signature?', options: ['C Major', 'G Major', 'Bb Major', 'F Major'], answer: 'F Major' },
];
const earTrainingIntervals = [
    { id: 'eti1', name: 'Major 3rd', steps: 4, question: 'Which interval did you hear?', options: ['Major 3rd', 'Perfect 5th'], answer: 'Major 3rd' },
    { id: 'eti2', name: 'Perfect 5th', steps: 7, question: 'Which interval did you hear?', options: ['Major 3rd', 'Perfect 5th'], answer: 'Perfect 5th' },
];
const scaleEarTrainingQuestions = [
    { id: 'set1', name: 'Major Scale', steps: [0, 2, 4, 5, 7, 9, 11, 12], question: 'What type of scale did you hear?', options: ['Major', 'Natural Minor'], answer: 'Major' },
    { id: 'set2', name: 'Natural Minor Scale', steps: [0, 2, 3, 5, 7, 8, 10, 12], question: 'What type of scale did you hear?', options: ['Major', 'Natural Minor'], answer: 'Natural Minor' },
];
const chordEarTrainingQuestions = [
    { id: 'cet1', name: 'Major Chord', steps: [0, 4, 7], question: 'What type of chord did you hear?', options: ['Major', 'Minor'], answer: 'Major' },
    { id: 'cet2', name: 'Minor Chord', steps: [0, 3, 7], question: 'What type of chord did you hear?', options: ['Major', 'Minor'], answer: 'Minor' },
];
const rhythmEarTrainingQuestions = [
    { id: 'ret1', pattern: [1, 1, 1, 1], bpm: 120, question: 'Which rhythm did you hear?', options: ['♩ ♩ ♩ ♩', '♩ ♪♪ ♩ ♩'], answer: '♩ ♩ ♩ ♩' },
    { id: 'ret2', pattern: [1, 0.5, 0.5, 1, 1], bpm: 120, question: 'Which rhythm did you hear?', options: ['♩ ♩ ♩ ♩', '♩ ♪♪ ♩ ♩'], answer: '♩ ♪♪ ♩ ♩' },
];

const modules = {
    'theory': { title: 'Music Theory', icon: Book, color: 'blue', lessons: [{id: 't1', title: 'Note Values', type: 'multiple-choice', questions: theoryQuestions.slice(0,1)}, {id: 't2', title: 'Time Signatures', type: 'multiple-choice', questions: theoryQuestions.slice(1,2)}, {id: 't3', title: 'Key Signatures', type: 'key-signature', questions: keySignatureQuestions}] },
    'sight-reading': { title: 'Sight-Reading', icon: ChevronsRight, color: 'green', lessons: [{id: 'sr1', title: 'Identifying Notes', type: 'sight-reading', questions: sightReadingExercises}] },
    'ear-training': { title: 'Ear Training', icon: Headphones, color: 'purple', lessons: [{id: 'et1', title: 'Recognizing Intervals', type: 'ear-training-interval', questions: earTrainingIntervals}, {id: 'et2', title: 'Scale Identification', type: 'ear-training-scale', questions: scaleEarTrainingQuestions}, {id: 'et3', title: 'Chord Identification', type: 'ear-training-chord', questions: chordEarTrainingQuestions}] },
    'rhythm-training': { title: 'Rhythm Training', icon: Timer, color: 'orange', lessons: [{id: 'rt1', title: 'Basic Rhythm Dictation', type: 'rhythm-dictation', questions: rhythmEarTrainingQuestions}] },
};

const musicAcademyGrades = [
    { id: 'preliminary', level: 'Preliminary', title: 'Foundations of Music', description: 'Start with basic theory, sight-reading, and vocal training.', modules: ['theory', 'sight-reading'] },
    { id: 'grade1', level: 'Grade One', title: 'Developing Skills', description: 'Introduce simple harmonies, rhythm patterns, and ear training.', modules: ['theory', 'ear-training'] },
    { id: 'grade2', level: 'Grade Two', title: 'Intermediate Musicianship', description: 'Explore four-part harmony and more complex rhythms.', modules: ['ear-training', 'rhythm-training'] },
    { id: 'grade3', level: 'Grade Three', title: 'Advanced Theory', description: 'Complex chords and harmonic analysis.', modules: ['theory', 'ear-training'] },
    { id: 'grade4', level: 'Grade Four', title: 'Performance Practice', description: 'Focus on performance, dynamics, and expression.', modules: ['sight-reading', 'rhythm-training'] },
    { id: 'grade5', level: 'Grade Five', title: 'Expert Musicianship', description: 'Master complex sight-reading and advanced harmony.', modules: ['theory', 'sight-reading', 'ear-training'] },
];


const ExerciseModal: React.FC<{ lesson: any; module: any; onClose: (completed: boolean) => void; }> = ({ lesson, module, onClose }) => {
    const { showToast } = useNotification();
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const audioContextRef = useRef<AudioContext>();

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => audioContextRef.current?.close();
    }, []);

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return;
        setSelectedAnswer(answer);
        const question = lesson.questions[currentQuestionIndex];
        const correct = answer === question.answer;
        if (correct) setScore(s => s + 1);

        setTimeout(() => {
            if (currentQuestionIndex + 1 >= lesson.questions.length) {
                const finalScore = score + (correct ? 1 : 0);
                const passed = finalScore / lesson.questions.length >= 0.8; // 80% to pass
                showToast(`Lesson Complete! Score: ${finalScore}/${lesson.questions.length}`, passed ? 'success' : 'error');
                onClose(passed);
            } else {
                setCurrentQuestionIndex(i => i + 1);
                setSelectedAnswer(null);
            }
        }, 1500);
    };
    
    const playSound = (type: string, data: any) => {
        const audioCtx = audioContextRef.current;
        if (!audioCtx) return;
        const baseFreq = 261.63; // C4

        const playNote = (freq: number, startTime: number, duration: number = 0.5) => {
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start(audioCtx.currentTime + startTime);
            oscillator.stop(audioCtx.currentTime + startTime + duration);
        };
        
        switch(type) {
            case 'ear-training-interval':
                playNote(baseFreq, 0, 0.4);
                playNote(baseFreq * Math.pow(2, data.steps / 12), 0.5, 0.4);
                break;
            case 'ear-training-scale':
                data.steps.forEach((step: number, index: number) => {
                    const freq = baseFreq * Math.pow(2, step / 12);
                    playNote(freq, index * 0.4, 0.35);
                });
                break;
            case 'ear-training-chord':
                 data.steps.forEach((step: number) => {
                    const freq = baseFreq * Math.pow(2, step / 12);
                    playNote(freq, 0, 0.8);
                });
                break;
            case 'rhythm-dictation':
                let time = 0;
                data.pattern.forEach((duration: number) => {
                    playNote(440, time, 0.1);
                    time += duration * (60 / data.bpm);
                });
                break;
        }
    };

    useEffect(() => {
        if (['ear-training-interval', 'ear-training-scale', 'ear-training-chord', 'rhythm-dictation'].includes(lesson.type)) {
            const question = lesson.questions[currentQuestionIndex];
            playSound(lesson.type, question);
        }
    }, [currentQuestionIndex, lesson.type]);


    const renderExercise = () => {
        const q = lesson.questions[currentQuestionIndex];
        const commonButtonClasses = 'text-lg !font-bold';
        const getButtonStateClass = (opt: string) => {
            if (!selectedAnswer) return '!bg-primary-500 hover:!bg-primary-600';
            if (opt === q.answer) return '!bg-green-500 !text-white';
            if (opt === selectedAnswer) return '!bg-red-500 !text-white';
            return '!bg-gray-300 !text-gray-500';
        };

        switch(lesson.type) {
            case 'sight-reading':
            case 'key-signature':
                return (
                     <div className="text-center">
                        <p className="text-xl font-bold mb-4">{q.question}</p>
                        <div className="bg-white p-4 rounded-lg"><img src={q.image} alt="Music staff" className="mx-auto"/></div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {q.options.map((opt: string) => <Button key={opt} onClick={() => handleAnswer(opt)} disabled={!!selectedAnswer} className={`${commonButtonClasses} ${getButtonStateClass(opt)}`}>{opt}</Button>)}
                        </div>
                    </div>
                );
            case 'ear-training-interval':
            case 'ear-training-scale':
            case 'ear-training-chord':
            case 'rhythm-dictation':
                return (
                    <div className="text-center">
                        <p className="text-xl font-bold mb-4">{q.question}</p>
                        <Button onClick={() => playSound(lesson.type, q)} className="mb-6"><Play className="mr-2"/> Play Sound Again</Button>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {q.options.map((opt: string) => <Button key={opt} onClick={() => handleAnswer(opt)} disabled={!!selectedAnswer} className={`${commonButtonClasses} ${getButtonStateClass(opt)}`}>{opt}</Button>)}
                        </div>
                    </div>
                );
            case 'multiple-choice':
            default:
                return (
                    <div className="text-center">
                        <p className="text-xl font-bold mb-6">{q.question}</p>
                        <div className="grid grid-cols-2 gap-4">
                            {q.options.map((opt:string) => <Button key={opt} onClick={() => handleAnswer(opt)} disabled={!!selectedAnswer} className={`${commonButtonClasses} ${getButtonStateClass(opt)}`}>{opt}</Button>)}
                        </div>
                    </div>
                );
        }
    }

    return (
        <Modal show={true} onClose={() => onClose(false)} title={`${module.title}: ${lesson.title}`}>
            <div className="min-h-[20rem] flex flex-col justify-center">
                {renderExercise()}
            </div>
        </Modal>
    );
};

const CertificateModal: React.FC<{ grade: any; onClose: () => void; }> = ({ grade, onClose }) => {
    const { userProfile } = useAuth();
    return (
        <Modal show={true} onClose={onClose} title="Congratulations!" size="2xl">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border-4 border-yellow-400 dark:border-yellow-600">
                <div className="text-center">
                    <Medal size={48} className="mx-auto text-yellow-500"/>
                    <h2 className="text-2xl font-bold mt-2">Certificate of Completion</h2>
                    <p className="text-gray-600 dark:text-gray-400">This certifies that</p>
                    <p className="text-3xl font-serif text-blue-700 dark:text-blue-400 my-4">{userProfile.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">has successfully completed the requirements for</p>
                    <p className="text-xl font-bold my-2">{grade.level}: {grade.title}</p>
                    <p className="text-sm mt-8">Issued on: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm mt-4 font-serif italic">Pastor W.F. Kumuyi, General Superintendent</p>
                </div>
            </div>
            <div className="mt-4 text-center">
                <Button>Download Certificate</Button>
            </div>
        </Modal>
    );
};


const GradeDetailView: React.FC<{ grade: any; onBack: () => void; completedLessons: string[]; onLessonComplete: (lessonId: string) => void; onGradeComplete: (gradeId: string) => void; isCompleted: boolean; }> = ({ grade, onBack, completedLessons, onLessonComplete, onGradeComplete, isCompleted }) => {
    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [activeModule, setActiveModule] = useState<any>(null);
    const [showCertificate, setShowCertificate] = useState(false);

    const allModuleLessons = useMemo(() => grade.modules.flatMap((modId:string) => modules[modId as keyof typeof modules].lessons.map(l => l.id)), [grade]);
    const allLessonsCompleted = useMemo(() => allModuleLessons.every((lId: string) => completedLessons.includes(lId)), [allModuleLessons, completedLessons]);

    const handleLessonClick = (lesson: any, mod: any, isLocked: boolean) => {
        if(isLocked) return;
        setActiveLesson(lesson);
        setActiveModule(mod);
    }
    
    const handleExam = () => {
        // In a real app, this would be a more complex exam modal
        onGradeComplete(grade.id);
        setShowCertificate(true);
    };

    return (
        <>
            {activeLesson && <ExerciseModal lesson={activeLesson} module={activeModule} onClose={(completed) => { if(completed) {onLessonComplete(activeLesson.id)}; setActiveLesson(null); }} />}
            {showCertificate && <CertificateModal grade={grade} onClose={() => setShowCertificate(false)} />}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold mb-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"><ChevronLeft/> Back to Path</button>
                <h2 className="text-2xl font-bold">{grade.level}: {grade.title}</h2>
                <div className="space-y-6 mt-6">
                    {grade.modules.map((moduleId: string, modIndex: number) => {
                        const mod = modules[moduleId as keyof typeof modules];
                        let isModuleLocked = false;
                        if(modIndex > 0) {
                            const prevModuleId = grade.modules[modIndex - 1];
                            const prevModuleLessons = modules[prevModuleId as keyof typeof modules].lessons;
                            isModuleLocked = !prevModuleLessons.every(l => completedLessons.includes(l.id));
                        }

                        return (
                            <div key={moduleId} className={`p-4 rounded-lg ${isModuleLocked ? 'bg-gray-100 dark:bg-gray-800/50 opacity-60' : ''}`}>
                                <h3 className={`font-bold text-xl flex items-center gap-2 text-${mod.color}-600 dark:text-${mod.color}-400 mb-3`}><mod.icon /> {mod.title} {isModuleLocked && <Lock size={16}/>}</h3>
                                <div className="space-y-2">
                                    {mod.lessons.map((lesson, lessonIndex) => {
                                        const isCompleted = completedLessons.includes(lesson.id);
                                        const isLessonLocked = isModuleLocked || (lessonIndex > 0 && !completedLessons.includes(mod.lessons[lessonIndex - 1].id));

                                        return (
                                             <button 
                                                key={lesson.id} 
                                                onClick={() => handleLessonClick(lesson, {id: moduleId, title: mod.title}, isLessonLocked)}
                                                disabled={isLessonLocked}
                                                className="w-full text-left flex items-center justify-between p-3 rounded-md transition-colors bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <span className="font-semibold">{lesson.title}</span>
                                                {isCompleted ? <CheckCircle className="text-green-500"/> : isLessonLocked ? <Lock size={16}/> : <Play size={16}/>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                 <div className="mt-8 text-center">
                    {isCompleted ? (
                        <Button size="lg" onClick={() => setShowCertificate(true)} className="!bg-yellow-500 hover:!bg-yellow-600">
                            <Award className="mr-2"/> View Certificate
                        </Button>
                    ) : (
                        <>
                            <Button size="lg" disabled={!allLessonsCompleted} onClick={handleExam}>
                                <Trophy className="mr-2"/> Take Final Exam
                            </Button>
                            {!allLessonsCompleted && <p className="text-xs text-gray-500 mt-2">Complete all lessons to unlock the exam.</p>}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

const MusicAcademyView = () => {
    const [completedGrades, setCompletedGrades] = useState<string[]>(['preliminary']);
    const [completedLessons, setCompletedLessons] = useState<string[]>(['t1', 't2', 't3', 'sr1']);
    const [selectedGrade, setSelectedGrade] = useState<any | null>(null);
    const [showCertificate, setShowCertificate] = useState(false);
    const [certificateGrade, setCertificateGrade] = useState<any | null>(null);
    
    const handleLessonComplete = (lessonId: string) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons(prev => [...prev, lessonId]);
        }
    };
    
    const handleGradeComplete = (gradeId: string) => {
        if (!completedGrades.includes(gradeId)) {
            setCompletedGrades(prev => [...prev, gradeId]);
        }
    };
    
    if (selectedGrade) {
        return <GradeDetailView grade={selectedGrade} onBack={() => setSelectedGrade(null)} completedLessons={completedLessons} onLessonComplete={handleLessonComplete} onGradeComplete={handleGradeComplete} isCompleted={completedGrades.includes(selectedGrade.id)} />;
    }

    return (
        <>
            {showCertificate && certificateGrade && <CertificateModal grade={certificateGrade} onClose={() => setShowCertificate(false)} />}
            <div className="space-y-8">
                <div className="text-center">
                    <Medal size={48} className="mx-auto text-blue-600 dark:text-blue-400" />
                    <h1 className="text-3xl font-bold mt-2">Music Academy</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Sharpen your skills and deepen your understanding of worship music through our structured, gamified training program.</p>
                </div>
                
                <section>
                    <h2 className="text-2xl font-bold mb-4">Your Learning Path</h2>
                    <div className="space-y-4">
                        {musicAcademyGrades.map((grade, index) => {
                            const isCompleted = completedGrades.includes(grade.id);
                            const isUnlocked = index === 0 || completedGrades.includes(musicAcademyGrades[index - 1].id);

                            if (isCompleted) {
                                return (
                                    <div
                                        key={grade.id}
                                        onClick={() => {
                                            setCertificateGrade(grade);
                                            setShowCertificate(true);
                                        }}
                                        className="group p-6 rounded-2xl bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-100 dark:from-gray-800 dark:via-yellow-900/30 dark:to-gray-800 border-2 border-yellow-400 dark:border-yellow-600 shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <Award size={40} className="text-yellow-500 dark:text-yellow-400 transition-transform duration-300 group-hover:scale-110"/>
                                            <p className="mt-3 font-bold text-sm uppercase tracking-wider text-yellow-600 dark:text-yellow-400">Certificate of Completion</p>
                                            <h3 className="mt-1 text-xl font-bold text-gray-800 dark:text-gray-100">{grade.title}</h3>
                                            <p className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200">Click to view your certificate</p>
                                        </div>
                                    </div>
                                );
                            }
                            
                            return (
                                <div 
                                    key={grade.id} 
                                    onClick={() => { if (isUnlocked) setSelectedGrade(grade) }}
                                    className={`p-6 rounded-2xl shadow-lg border-l-8 transition-all duration-300 transform-gpu ${
                                        isUnlocked ? 'border-blue-500 bg-white dark:bg-gray-800 hover:-translate-y-1' :
                                        'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800/50 opacity-70'
                                    } ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{grade.level}</p>
                                            <h3 className="text-xl font-bold">{grade.title}</h3>
                                        </div>
                                        {!isUnlocked ? <Lock /> : <ChevronsRight />}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </>
    );
};

// --- MUSICIAN'S TOOLKIT COMPONENTS (MOVED FROM HYMNS.TSX) ---

const Metronome = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [visualPulse, setVisualPulse] = useState(false);
    const timerRef = useRef<number | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const lastTapRef = useRef<number>(0);
    const tapCountRef = useRef<number>(0);
    const tapIntervalsRef = useRef<number[]>([]);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            audioContextRef.current?.close();
        };
    }, []);

    const playTick = () => {
        if (!audioContextRef.current) return;
        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioContextRef.current.currentTime);
        oscillator.connect(audioContextRef.current.destination);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 0.05);
        setVisualPulse(true);
        setTimeout(() => setVisualPulse(false), 100);
    };

    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (isPlaying) {
            timerRef.current = window.setInterval(playTick, (60 / bpm) * 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, bpm]);
    
    const handleTapTempo = () => {
        const now = Date.now();
        if (lastTapRef.current && now - lastTapRef.current > 2000) {
            tapCountRef.current = 0;
            tapIntervalsRef.current = [];
        }
        
        if (tapCountRef.current > 0) {
            tapIntervalsRef.current.push(now - lastTapRef.current);
        }
        lastTapRef.current = now;
        tapCountRef.current++;
        if (tapIntervalsRef.current.length >= 1) {
            const avgInterval = tapIntervalsRef.current.reduce((a, b) => a + b, 0) / tapIntervalsRef.current.length;
             if (avgInterval > 0) setBpm(Math.round(60000 / avgInterval));
        }
        if (tapIntervalsRef.current.length > 4) {
            tapIntervalsRef.current.shift();
        }
    };


    return (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Timer /> Metronome</h3>
            <div className={`w-8 h-8 rounded-full bg-red-500 mb-4 transition-transform duration-100 ${visualPulse ? 'scale-125' : ''}`}></div>
            <p className="font-mono text-7xl font-bold">{bpm}</p>
            <p className="text-sm text-gray-400">Beats Per Minute</p>
            <input type="range" min="40" max="220" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-full my-6" />
            <div className="flex items-center gap-4">
                 <Button onClick={handleTapTempo} variant="ghost" className="!bg-gray-700 !text-white hover:!bg-gray-600">Tap Tempo</Button>
                <button onClick={() => setIsPlaying(!isPlaying)} className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-colors ${isPlaying ? 'bg-red-600' : 'bg-green-600'}`}>
                    {isPlaying ? <Pause size={32}/> : <Play size={32}/>}
                </button>
            </div>
        </div>
    );
};

const Tuner = () => {
    const { showToast } = useNotification();
    const [isTuning, setIsTuning] = useState(false);
    const [note, setNote] = useState({ name: 'A', octave: 4, frequency: 440, detune: 0 });
    
    const audioContextRef = useRef<AudioContext>();
    const analyserRef = useRef<AnalyserNode>();
    const streamRef = useRef<MediaStream>();
    const animationFrameRef = useRef<number>();

    const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    const frequencyToNote = (frequency: number) => {
        const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        const roundedNoteNum = Math.round(noteNum) + 69;
        const octave = Math.floor(roundedNoteNum / 12) - 1;
        const name = noteStrings[roundedNoteNum % 12];
        const detune = 100 * (noteNum - Math.round(noteNum));
        return { name, octave, frequency, detune };
    };

    const processMicrophoneBuffer = () => {
        if (!analyserRef.current) return;
        const buffer = new Float32Array(analyserRef.current.fftSize);
        analyserRef.current.getFloatTimeDomainData(buffer);
        
        let rms = 0;
        for (let i = 0; i < buffer.length; i++) {
            rms += buffer[i] * buffer[i];
        }
        rms = Math.sqrt(rms / buffer.length);
        if (rms < 0.01) { // Not enough signal
             animationFrameRef.current = requestAnimationFrame(processMicrophoneBuffer);
            return;
        }

        let r = new Array(buffer.length).fill(0);
        let max_r = 0, best_offset = -1;
        for (let offset = 1; offset < buffer.length; offset++) {
            r[offset] = 0;
            for (let i = 0; i < buffer.length - offset; i++) {
                r[offset] += buffer[i] * buffer[i+offset];
            }
            if (r[offset] > max_r) {
                max_r = r[offset];
                best_offset = offset;
            }
        }
        if (best_offset !== -1) {
            const freq = audioContextRef.current!.sampleRate / best_offset;
            if(freq > 50 && freq < 1500) { // Reasonable vocal/instrument range
                setNote(frequencyToNote(freq));
            }
        }
        animationFrameRef.current = requestAnimationFrame(processMicrophoneBuffer);
    };

    const toggleTuning = async () => {
        if (isTuning) {
            streamRef.current?.getTracks().forEach(track => track.stop());
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            setIsTuning(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048;
                const source = audioContextRef.current.createMediaStreamSource(stream);
                source.connect(analyserRef.current);
                setIsTuning(true);
                processMicrophoneBuffer();
            } catch (err) {
                showToast('Microphone access denied.', 'error');
                console.error(err);
            }
        }
    };
    
    useEffect(() => {
        return () => {
             streamRef.current?.getTracks().forEach(track => track.stop());
             if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
    }, [])

    const detunePercentage = (note.detune / 50) * 100;

    return (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Mic /> Chromatic Tuner</h3>
             <div className="w-full h-40 flex flex-col items-center justify-center">
                {isTuning ? <>
                    <div className="font-mono text-7xl font-bold flex items-start">
                        {note.name.slice(0,1)}<span className="text-4xl mt-2">{note.name.slice(1)}</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-600 rounded-full mt-2">
                        <div className={`absolute h-full rounded-full transition-all duration-75 ${Math.abs(note.detune) < 5 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: '4px', left: `calc(50% + ${detunePercentage/2}%)`, transform: 'translateX(-50%)' }}></div>
                    </div>
                    <p className="text-sm mt-2">{note.detune.toFixed(0)} cents</p>
                </> : <p className="text-gray-400">Start tuner to check your pitch</p>}
             </div>
             <button onClick={toggleTuning} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-full font-bold transition-colors">
                <Power size={18} /> {isTuning ? 'Stop Tuning' : 'Start Tuning'}
             </button>
        </div>
    );
};

const PianoKeyboard = () => {
    const audioContextRef = useRef<AudioContext>();
    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }, []);

    const playNote = (frequency: number) => {
        if (!audioContextRef.current) return;
        const oscillator = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
        
        gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 1);

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        oscillator.start();
        oscillator.stop(audioContextRef.current.currentTime + 1);
    };

    const notes = [
        { note: 'C', freq: 261.63, type: 'white' },
        { note: 'C#', freq: 277.18, type: 'black' },
        { note: 'D', freq: 293.66, type: 'white' },
        { note: 'D#', freq: 311.13, type: 'black' },
        { note: 'E', freq: 329.63, type: 'white' },
        { note: 'F', freq: 349.23, type: 'white' },
        { note: 'F#', freq: 369.99, type: 'black' },
        { note: 'G', freq: 392.00, type: 'white' },
        { note: 'G#', freq: 415.30, type: 'black' },
        { note: 'A', freq: 440.00, type: 'white' },
        { note: 'A#', freq: 466.16, type: 'black' },
        { note: 'B', freq: 493.88, type: 'white' },
        { note: 'C', freq: 523.25, type: 'white' },
    ];
    
    return (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Piano /> Digital Piano</h3>
            <div className="relative h-48 w-full">
                {notes.filter(n => n.type === 'white').map((n, i) => (
                    <button key={i} onMouseDown={() => playNote(n.freq)} className="absolute h-full border-2 border-gray-900 bg-white active:bg-gray-300 rounded-b-md text-black font-bold text-xs pt-32" style={{ width: '12.5%', left: `${i * 12.5}%` }}>
                        {n.note}
                    </button>
                ))}
                 {notes.map((n, i) => {
                    if (n.type === 'black') {
                        let pos = 0;
                         if(n.note === 'C#') pos = 8.3;
                         if(n.note === 'D#') pos = 21.3;
                         if(n.note === 'F#') pos = 46.3;
                         if(n.note === 'G#') pos = 59.3;
                         if(n.note === 'A#') pos = 72.3;

                        return (
                            <button key={i} onMouseDown={() => playNote(n.freq)} className="absolute h-2/3 w-[8%] bg-black active:bg-gray-700 rounded-b-md border-2 border-gray-900 z-10" style={{ left: `${pos}%` }}></button>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

const MusiciansToolkitView = () => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <Music size={48} className="mx-auto text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold mt-2">Musician's Toolkit</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Essential tools to help you practice, improve your pitch, and master your rhythm.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Metronome />
                <Tuner />
                <PianoKeyboard />
            </div>
        </div>
    );
};

// --- MAIN CHORISTER HUB COMPONENT ---
type ChoristerView = 'dashboard' | 'academy' | 'toolkit';

interface ChoristerHubProps {
    setActiveTab: (tab: ActiveTab) => void;
}

const ChoristerHub: React.FC<ChoristerHubProps> = ({ setActiveTab }) => {
    const [view, setView] = useState<ChoristerView>('dashboard');

    const DashboardView = () => {
        const rehearsals = [
            { day: 'Saturdays', time: '4:00 PM - 6:00 PM', title: 'Weekly General Rehearsal' },
            { day: 'Fridays', time: '6:00 PM - 7:00 PM', title: 'GCK Special Rehearsal' },
        ];
        const repertoire = [
            { number: 9, title: "Great Is Thy Faithfulness" },
            { number: 18, title: "Blessed Assurance" },
            { number: 24, title: "It Is Well With My Soul" },
        ];
        return (
            <div className="space-y-6">
                 <Card>
                    <h3 className="font-bold text-lg flex items-center gap-2 mb-3"><Megaphone className="text-orange-500"/> Announcements</h3>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <p className="font-semibold text-orange-800 dark:text-orange-200">Important: GCK Rehearsal</p>
                        <p className="text-sm text-orange-700 dark:text-orange-300">All choristers are required to attend the special GCK rehearsal this Friday. Please come with your GHS hymn book and be punctual. Let's prepare to make a joyful noise unto the Lord!</p>
                    </div>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-3"><Timer className="text-purple-500"/> Rehearsal Schedule</h3>
                        <div className="space-y-2">
                            {rehearsals.map(r => (
                                <div key={r.title} className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-md">
                                    <p className="font-semibold">{r.title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{r.day} @ {r.time}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card>
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-3"><Music className="text-green-500"/> Hymns on Rotation</h3>
                         <div className="space-y-2">
                            {repertoire.map(h => (
                                <div key={h.number} className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-md">
                                    <p className="font-semibold">GHS {h.number}: {h.title}</p>
                                </div>
                            ))}
                        </div>
                        <Button onClick={() => setActiveTab('ghs')} size="sm" variant="ghost" className="mt-3">
                            Go to Hymn Library
                        </Button>
                    </Card>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch(view) {
            case 'academy': return <MusicAcademyView />;
            case 'toolkit': return <MusiciansToolkitView />;
            case 'dashboard':
            default: return <DashboardView />;
        }
    }

    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Chorister's Hub</h1>
                {view !== 'dashboard' && <Button onClick={() => setView('dashboard')}><ChevronLeft size={16} className="mr-1"/> Back to Hub Dashboard</Button>}
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center cursor-pointer hover:shadow-2xl transition-all duration-300 ${view === 'dashboard' ? 'ring-4 ring-offset-2 ring-white dark:ring-offset-gray-900' : ''}`} onClick={() => setView('dashboard')}>
                    <Users size={32} className="mx-auto mb-2"/>
                    <h2 className="text-xl font-bold">Dashboard</h2>
                    <p className="mt-1 text-blue-100 text-sm">Announcements & Schedule</p>
                </div>
                <div className={`bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white text-center cursor-pointer hover:shadow-2xl transition-all duration-300 ${view === 'academy' ? 'ring-4 ring-offset-2 ring-white dark:ring-offset-gray-900' : ''}`} onClick={() => setView('academy')}>
                    <GraduationCap size={32} className="mx-auto mb-2"/>
                    <h2 className="text-xl font-bold">Music Academy</h2>
                    <p className="mt-1 text-green-100 text-sm">Structured training and certification.</p>
                </div>
                <div className={`bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-6 text-white text-center cursor-pointer hover:shadow-2xl transition-all duration-300 ${view === 'toolkit' ? 'ring-4 ring-offset-2 ring-white dark:ring-offset-gray-900' : ''}`} onClick={() => setView('toolkit')}>
                    <Music size={32} className="mx-auto mb-2"/>
                    <h2 className="text-xl font-bold">Musician's Toolkit</h2>
                    <p className="mt-1 text-gray-300 text-sm">Practice tools for every chorister.</p>
                </div>
             </div>

            {renderContent()}
        </div>
    );
};

export default ChoristerHub;