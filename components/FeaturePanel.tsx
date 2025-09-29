import React, { useState } from 'react';
import { ChevronDown, BarChart3, Globe, Zap, Shield, ChevronUp, Brain, Feather, Rss } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';
import Button from './ui/Button';

const AnalyticsDashboard: React.FC = () => (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Productivity</p>
                <p className="text-xl font-bold text-green-500">94%</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                <p className="text-xl font-bold text-blue-500">2.3m</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI Savings</p>
                <p className="text-xl font-bold text-purple-500">+$2.1K</p>
            </div>
        </div>
        <div className="h-16 bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg mt-4 flex items-end p-1 gap-1">
            {[60, 80, 45, 90, 75, 95, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
            ))}
        </div>
    </div>
);

const MinistryAssistant: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useNotification();

    const handleGenerate = (type: string) => {
        if (!prompt) {
            showToast('Please enter a topic first.', 'error');
            return;
        }
        setIsLoading(true);
        setResult(''); 
        setTimeout(() => {
            let mockResult = '';
            if (type === 'sermon') {
                mockResult = `**Sermon Outline: ${prompt}**\n\n1. **Introduction:** The biblical importance of ${prompt}.\n2. **Key Scripture Analysis:** Exploring foundational verses related to the topic.\n3. **Practical Application:** How to apply these principles in daily life.\n4. **Illustrative Story:** A relatable anecdote or example.\n5. **Conclusion:** A powerful call to action.`;
            } else if (type === 'announcement') {
                mockResult = `**Announcement: ${prompt}**\n\n📣 Attention Brethren! You're invited to our special event: "${prompt}". Join us for a powerful time of fellowship and spiritual growth. Mark your calendars and invite a friend! More details to follow. #DeeperLifeEvents`;
            }
            setResult(mockResult);
            setIsLoading(false);
            showToast('AI content generated!', 'success');
        }, 1500);
    }
    
    return (
        <div className="p-2 space-y-3">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Get instant help with your ministry tasks. Provide a topic below.</p>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'a sermon on The Power of Forgiveness'"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                rows={3}
            />
            <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => handleGenerate('sermon')}>
                    <Feather size={16} className="mr-2" /> Sermon Outline
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleGenerate('announcement')}>
                     <Rss size={16} className="mr-2" /> Announcement Post
                </Button>
            </div>
            {(isLoading || result) && (
                <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg">
                    {isLoading ? (
                         <div className="flex items-center justify-center h-24">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-700"></div>
                         </div>
                    ) : (
                         <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    )}
                </div>
            )}
        </div>
    );
};

const FeatureItem: React.FC<{ title: string, description: string, onClick: () => void }> = ({ title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
);

interface FeatureSectionProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    startOpen?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, icon: Icon, children, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    return (
        <div>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
            >
                <div className="flex items-center gap-2">
                    <Icon size={18} />
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">{title}</h3>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
                <div className="p-2 space-y-2 mt-2">
                    {children}
                </div>
            )}
        </div>
    );
};


const FeaturePanel: React.FC = () => {
    const { showToast } = useNotification();

    return (
        <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-50">🤖 AI & Ministry Tools</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                <FeatureSection title="Ministry AI Assistant" icon={Brain} startOpen={true}>
                    <MinistryAssistant />
                </FeatureSection>
                
                <FeatureSection title="Business Intelligence" icon={BarChart3}>
                    <AnalyticsDashboard />
                    <FeatureItem 
                        title="📈 Advanced Analytics" 
                        description="Response rates, productivity"
                        onClick={() => showToast('Navigating to Advanced Analytics.', 'success')}
                    />
                     <FeatureItem 
                        title="👥 Team Collaboration" 
                        description="Shared tasks & projects"
                        onClick={() => showToast('Team collaboration mode activated.', 'success')}
                    />
                </FeatureSection>
                
                <FeatureSection title="Global Communication" icon={Globe}>
                    <FeatureItem 
                        title="🌍 Real-time Translation" 
                        description="100+ languages instantly"
                        onClick={() => showToast('Real-time translation enabled!', 'success')}
                    />
                    <FeatureItem 
                        title="🎤 Voice Transcription" 
                        description="Voice to searchable text"
                        onClick={() => showToast('Voice transcription is now active for all audio.', 'success')}
                    />
                </FeatureSection>

                <FeatureSection title="Smart Productivity" icon={Zap}>
                    <FeatureItem 
                        title="📅 AI Message Scheduling" 
                        description="Optimal send times"
                        onClick={() => showToast('AI will suggest best times to send messages.', 'success')}
                    />
                    <FeatureItem 
                        title="🎯 AI Focus Mode" 
                        description="Smart do-not-disturb"
                        onClick={() => showToast('Focus mode enabled. Distractions minimized.', 'success')}
                    />
                </FeatureSection>
                
                 <FeatureSection title="Enterprise Security" icon={Shield}>
                    <FeatureItem 
                        title="🛡️ Business-Grade Encryption" 
                        description="Military-level security"
                        onClick={() => showToast('End-to-end encryption verified.', 'success')}
                    />
                     <FeatureItem 
                        title="📋 Compliance Management" 
                        description="GDPR, HIPAA ready"
                        onClick={() => showToast('Compliance reports are being generated.', 'success')}
                    />
                </FeatureSection>

            </div>
        </div>
    );
};

export default FeaturePanel;