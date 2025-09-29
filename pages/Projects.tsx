
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useNotification } from '../hooks/useNotification';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';
import { Plus } from 'lucide-react';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

const initialFormState = {
    project_name: '', target_amount: '', start_date: ''
};

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    const { showToast } = useNotification();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProject: Project = {
            id: `proj-${Date.now()}`,
            project_name: formState.project_name,
            target_amount: parseFloat(formState.target_amount),
            start_date: formState.start_date,
            current_amount: 0,
            status: 'active',
        };
        
        setProjects(prev => [newProject, ...prev]);
        showToast('Project created successfully!');
        setIsModalOpen(false);
        setFormState(initialFormState);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 inline-block mr-1" /> Add Project
                </Button>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Project Name</th>
                                <th className="px-6 py-3">Target Amount</th>
                                <th className="px-6 py-3">Current Amount</th>
                                <th className="px-6 py-3">Start Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                              <tr key={project.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{project.project_name}</td>
                                <td className="px-6 py-4">{formatCurrency(project.target_amount)}</td>
                                <td className="px-6 py-4 font-semibold">{formatCurrency(project.current_amount)}</td>
                                <td className="px-6 py-4">{formatDate(project.start_date)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                        project.status === 'active' ? 'bg-green-100 text-green-800' : 
                                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

             <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Project">
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input type="text" value={formState.project_name} onChange={(e) => setFormState({...formState, project_name: e.target.value})} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Target Amount</label>
                        <input type="number" value={formState.target_amount} onChange={(e) => setFormState({...formState, target_amount: e.target.value})} min="1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" value={formState.start_date} onChange={(e) => setFormState({...formState, start_date: e.target.value})} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"/>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Add Project</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Projects;
