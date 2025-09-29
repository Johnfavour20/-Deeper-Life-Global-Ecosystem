import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import FileUpload from '../components/ui/FileUpload';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { mockSermons } from '../data/mockData';
import type { Sermon, MinistryDepartment } from '../types';
import { summarizeSermon } from '../services/geminiService';
import { AiIcon } from '../components/icons';
import { Plus, Play, Share2 } from 'lucide-react';

const MessageCard: React.FC<{ sermon: Sermon, onSummarize: (sermon: Sermon) => void }> = ({ sermon, onSummarize }) => {
    const { showToast } = useNotification();
    const handleShare = () => {
        navigator.clipboard.writeText(`Check out this message: "${sermon.title}" by ${sermon.preacher}.`);
        showToast("Message details copied to clipboard!");
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">{sermon.title}</h4>
                    <span className="bg-gray-100 text-primary-800 text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2">{sermon.target_department}</span>
                </div>
                <p className="text-primary-700 text-sm font-medium mt-1">{sermon.preacher}</p>
                <div className="flex items-center text-gray-500 text-xs mt-2 space-x-4">
                    <span>{sermon.date}</span>
                </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
                <Button size="sm">
                    <Play size={14} className="mr-1" /> Play
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onSummarize(sermon)}>
                    <AiIcon className="w-4 h-4 mr-1" /> Summary
                </Button>
                <button onClick={handleShare} className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Share">
                    <Share2 size={16} />
                </button>
            </div>
        </div>
    );
};

const initialSermonFormState = {
    title: '', preacher: '', date: '', content: '', audio_path: '', target_department: 'General' as MinistryDepartment,
};

const Sermons: React.FC = () => {
    const { user } = useAuth();
    const { showToast } = useNotification();

    const [sermons, setSermons] = useState<Sermon[]>(mockSermons);
    const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
    const [formState, setFormState] = useState(initialSermonFormState);
    const [departmentFilter, setDepartmentFilter] = useState('All');

    const isAdmin = user && ['group_admin', 'regional_admin'].includes(user.role);

    const handleSummarize = async (sermon: Sermon) => {
        setSelectedSermon(sermon);
        setSummaryModalOpen(true);
        setSummary('');
        setIsLoading(true);
        const result = await summarizeSermon(sermon.content);
        setSummary(result);
        setIsLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value as MinistryDepartment }));
    };

    const handleFileSelect = (file: { name: string }) => {
        setFormState(prev => ({ ...prev, audio_path: `/audio/${file.name}` }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newSermon: Sermon = { id: `sermon-${Date.now()}`, ...formState };
        setSermons(prev => [newSermon, ...prev]);
        showToast('Sermon added successfully!');
        setAddModalOpen(false);
        setFormState(initialSermonFormState);
    };

    const filteredSermons = sermons.filter(sermon =>
        departmentFilter === 'All' || sermon.target_department === departmentFilter
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Message Library</h1>
                {isAdmin && (
                    <Button onClick={() => setAddModalOpen(true)}>
                        <Plus className="w-5 h-5 mr-2" /> Add Message
                    </Button>
                )}
            </div>

            <div className="mb-6 flex items-center space-x-4">
                <label htmlFor="departmentFilter" className="block text-sm font-medium text-gray-700">Filter by Department:</label>
                <select
                    id="departmentFilter"
                    name="departmentFilter"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="block w-full max-w-xs pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                    <option>All</option>
                    <option>General</option>
                    <option>Children</option>
                    <option>Youth</option>
                    <option>Young Adults</option>
                    <option>Adult</option>
                    <option>Specialized</option>
                </select>
            </div>
            
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSermons.map(sermon => (
                        <MessageCard key={sermon.id} sermon={sermon} onSummarize={handleSummarize} />
                    ))}
                </div>
            </Card>

            <Modal show={isSummaryModalOpen} onClose={() => setSummaryModalOpen(false)} title={`AI Summary: ${selectedSermon?.title}`}>
                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-700"></div>
                    </div>
                ) : (
                    <div className="prose prose-sm max-w-none">
                        <ul>
                            {summary.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^- /, '').replace(/\* /, '')}</li>)}
                        </ul>
                    </div>
                )}
            </Modal>

            <Modal show={isAddModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Message">
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" value={formState.title} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Preacher</label>
                            <input type="text" name="preacher" value={formState.preacher} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                        </div>
                     </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" name="date" value={formState.date} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Target Department</label>
                            <select name="target_department" value={formState.target_department} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                                <option value="General">General</option>
                                <option value="Children">Children</option>
                                <option value="Youth">Youth</option>
                                <option value="Young Adults">Young Adults</option>
                                <option value="Adult">Adult</option>
                                <option value="Specialized">Specialized</option>
                            </select>
                        </div>
                     </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message Content/Notes</label>
                        <textarea name="content" value={formState.content} onChange={handleInputChange} rows={5} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                    </div>
                    <FileUpload 
                        onFileSelect={handleFileSelect}
                        accept="audio/mpeg, audio/wav, audio/mp3"
                        label="Upload Message Audio"
                    />

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setAddModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Message</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Sermons;
