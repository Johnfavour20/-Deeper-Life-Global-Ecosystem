import React, { useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { privilegeLevels } from '../constants';
import { UserRole, UserProfile } from '../types';
import { Upload, Sparkles, Wand2 } from 'lucide-react';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { useNotification } from '../hooks/useNotification';
import { generateProfilePicture } from '../services/geminiService';

const AIProfileGenerator: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onApply: (base64Image: string) => void;
}> = ({ isOpen, onClose, onApply }) => {
    const { showToast } = useNotification();
    const [prompt, setPrompt] = useState('A joyful member, portrait style, vibrant colors');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt) {
            showToast('Please describe the image you want to generate.', 'error');
            return;
        }
        setIsLoading(true);
        setGeneratedImage(null);
        try {
            const base64String = await generateProfilePicture(prompt);
            setGeneratedImage(base64String);
        } catch (error) {
            console.error(error);
            showToast('Failed to generate image. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleApplyAndClose = () => {
        if (generatedImage) {
            onApply(generatedImage);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} title="AI Profile Picture Generator" size="lg">
            <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Describe the profile picture you'd like to create. Be descriptive for the best results!</p>
                
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A joyful woman singing praises, a man studying the Bible in a peaceful garden..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />

                <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden">
                    {isLoading ? (
                         <div className="flex flex-col items-center justify-center text-gray-500">
                            <Wand2 size={48} className="animate-pulse" />
                            <p className="mt-2 text-sm font-medium">Generating your image...</p>
                         </div>
                    ) : generatedImage ? (
                        <img src={`data:image/png;base64,${generatedImage}`} alt="Generated profile" className="w-full h-full object-cover"/>
                    ) : (
                         <div className="text-center text-gray-400">
                            <Sparkles size={48} />
                            <p className="mt-2 text-sm">Your generated image will appear here</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end items-center gap-3">
                     <Button variant="ghost" onClick={handleGenerate} disabled={isLoading}>
                        {generatedImage ? 'Regenerate' : 'Generate'}
                    </Button>
                    <Button onClick={handleApplyAndClose} disabled={!generatedImage || isLoading}>
                        Apply Picture
                    </Button>
                </div>
            </div>
        </Modal>
    );
};


const Settings: React.FC = () => {
    const { userProfile, setUserProfile, userRole, setUserRole, hasUnsavedChanges, setHasUnsavedChanges, handleSaveChanges, handleCancelChanges } = useAuth();
    const { showToast } = useNotification();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    const handleProfileUpdate = (field: keyof UserProfile, value: any) => {
        setUserProfile(prev => ({ ...prev, [field]: value }));
        setHasUnsavedChanges(true);
    };

    const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const growth = userProfile.growth;
                    handleProfileUpdate('profilePictureUrl', event.target.result as string);
                    setUserProfile(prev => ({...prev, growth})); // preserve growth object
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleApplyAiPicture = (base64Image: string) => {
        handleProfileUpdate('profilePictureUrl', `data:image/png;base64,${base64Image}`);
        setIsAiModalOpen(false);
        showToast('AI profile picture applied!', 'success');
    };
    
    const GrowthTracker = ({ label, value, color }: { label: string; value: number; color: string }) => (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                <span className={`text-sm font-medium text-${color}-600 dark:text-${color}-400`}>{value}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className={`bg-${color}-600 h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Settings</h1>

            <AIProfileGenerator 
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                onApply={handleApplyAiPicture}
            />

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">User Profile</h2>
                    {hasUnsavedChanges && (
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-yellow-600 dark:text-yellow-400">Unsaved changes</span>
                            <button onClick={handleCancelChanges} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium">Cancel</button>
                            <button onClick={handleSaveChanges} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Save Changes</button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center">
                        <img src={userProfile.profilePictureUrl} alt="Profile" className="w-32 h-32 rounded-full mb-4 object-cover shadow-md" />
                         <div className="flex flex-wrap justify-center gap-2">
                            <button onClick={() => fileInputRef.current?.click()} className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                                <Upload size={16} className="inline mr-2" /> Change Picture
                            </button>
                            <button onClick={() => setIsAiModalOpen(true)} className="flex items-center bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                                <Sparkles size={16} className="inline mr-2" /> Generate with AI
                            </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handlePictureUpload} className="hidden" accept="image/*" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">JPG, PNG, GIF up to 5MB.</p>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input type="text" value={userProfile.name} onChange={e => handleProfileUpdate('name', e.target.value)} className="w-full mt-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <input type="email" value={userProfile.email} onChange={e => handleProfileUpdate('email', e.target.value)} className="w-full mt-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 py-2" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                            <input type="tel" value={userProfile.phone} onChange={e => handleProfileUpdate('phone', e.target.value)} className="w-full mt-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 py-2" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                            <textarea value={userProfile.bio} onChange={e => handleProfileUpdate('bio', e.target.value)} rows={3} className="w-full mt-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 py-2"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Spiritual Growth Tracker</h2>
                    <div className="space-y-4">
                        <GrowthTracker label="Bible Reading Progress" value={userProfile.growth.bibleReading} color="blue" />
                        <GrowthTracker label="Sermons Watched" value={userProfile.growth.sermonsWatched} color="green" />
                        <GrowthTracker label="GHS Hymns Learned" value={userProfile.growth.hymnsLearned} color="purple" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Preferences</h2>
                    <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Role (for demo)</span>
                            <select value={userRole} onChange={(e) => setUserRole(e.target.value as UserRole)} className="border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg px-3 py-1 text-sm">
                                {Object.keys(privilegeLevels).map(role => <option key={role} value={role}>{privilegeLevels[role as UserRole]}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;