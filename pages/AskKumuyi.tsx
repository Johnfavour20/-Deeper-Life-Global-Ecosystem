import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Lightbulb, ClipboardList } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { askKumuyi, generateSermonOutline, findIllustrations, suggestScriptures } from '../services/geminiService';
import Button from '../components/ui/Button';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

interface KumuyiChatTurn {
    role: "user" | "model";
    parts: { text: string }[];
}

const QandAView: React.FC = () => {
    const { userProfile } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Welcome, my dear brother/sister. I am here to provide scriptural counsel and encouragement. How may I help you today?",
            sender: 'ai',
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const history: KumuyiChatTurn[] = messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        try {
            const aiResponseText = await askKumuyi(input, history);
            const aiMessage: Message = {
                id: Date.now() + 1,
                text: aiResponseText,
                sender: 'ai',
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "I am sorry, an error occurred while trying to respond. Please check your connection and try again.",
                sender: 'ai',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const examplePrompts = [
        "How can I overcome temptation?",
        "Explain the importance of holiness.",
        "What does the Bible say about forgiveness?",
        "I'm feeling discouraged, what should I do?"
    ];

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                        {message.sender === 'ai' && (
                           <img src="https://avatar.iran.liara.run/public/8" alt="AI" className="w-8 h-8 rounded-full flex-shrink-0" />
                        )}
                        <div className={`max-w-md rounded-2xl p-3 text-sm shadow ${
                            message.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                        }`}>
                            <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>
                         {message.sender === 'user' && (
                           <img src={userProfile.profilePictureUrl} alt="User" className="w-8 h-8 rounded-full flex-shrink-0" />
                        )}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                        <img src="https://avatar.iran.liara.run/public/8" alt="AI" className="w-8 h-8 rounded-full" />
                        <div className="max-w-md rounded-2xl p-3 bg-gray-100 dark:bg-gray-700 shadow flex items-center space-x-2">
                           <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>
            
            <footer className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex flex-wrap gap-2 mb-3">
                    {examplePrompts.map(prompt => (
                        <button key={prompt} onClick={() => setInput(prompt)} className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            {prompt}
                        </button>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors">
                        <Send size={18} />
                    </button>
                </form>
            </footer>
        </div>
    );
};

const SermonPrepView: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [results, setResults] = useState<{ outline: string; illustrations: string; scriptures: string }>({ outline: '', illustrations: '', scriptures: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setResults({ outline: '', illustrations: '', scriptures: '' });
        
        const [outline, illustrations, scriptures] = await Promise.all([
            generateSermonOutline(topic),
            findIllustrations(topic),
            suggestScriptures(topic)
        ]);

        setResults({ outline, illustrations, scriptures });
        setIsLoading(false);
    };
    
    const ResultCard: React.FC<{ title: string; icon: React.ElementType; content: string }> = ({ title, icon: Icon, content }) => (
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300"><Icon size={20} /> {title}</h3>
            <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />').replace(/\*\*/g, '') }} />
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <label htmlFor="sermon-topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sermon Topic</label>
                <div className="flex gap-2">
                    <input
                        id="sermon-topic"
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., The Power of a Consecrated Life"
                        className="flex-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleGenerate} disabled={isLoading || !topic.trim()}>
                        {isLoading ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
            </div>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                 {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-700"></div>
                    </div>
                 ) : (
                    <>
                        {results.outline && <ResultCard title="Sermon Outline" icon={ClipboardList} content={results.outline} />}
                        {results.illustrations && <ResultCard title="Illustrations" icon={Lightbulb} content={results.illustrations} />}
                        {results.scriptures && <ResultCard title="Cross-references" icon={BookOpen} content={results.scriptures} />}
                        {!results.outline && !results.illustrations && !results.scriptures && (
                            <div className="text-center text-gray-500 pt-16">
                                <p>Enter a topic above to generate sermon preparation materials.</p>
                            </div>
                        )}
                    </>
                 )}
            </main>
        </div>
    );
};


const AskKumuyi: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'qa' | 'sermon_prep'>('qa');
    
    return (
        <div className="flex flex-col h-full bg-transparent overflow-hidden">
            <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                    <button onClick={() => setActiveTab('qa')} className={`flex-1 p-3 text-sm font-semibold text-center ${activeTab === 'qa' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Q&A with Pastor Kumuyi</button>
                    <button onClick={() => setActiveTab('sermon_prep')} className={`flex-1 p-3 text-sm font-semibold text-center ${activeTab === 'sermon_prep' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>Sermon Prep</button>
                </div>
            </div>
            {activeTab === 'qa' ? <QandAView /> : <SermonPrepView />}
        </div>
    );
};

export default AskKumuyi;
