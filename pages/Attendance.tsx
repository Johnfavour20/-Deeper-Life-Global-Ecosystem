import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useNotification } from '../hooks/useNotification';
import { mockAttendance } from '../data/mockData';
import { AttendanceRecord } from '../types';
import { Plus } from 'lucide-react';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const initialFormState = {
    service_date: '', men: 0, women: 0, youth_boys: 0, youth_girls: 0,
    children_boys: 0, children_girls: 0, new_converts: 0, youtube: 0,
};

const Attendance: React.FC = () => {
    const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(mockAttendance);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    const { showToast } = useNotification();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: parseInt(value) >= 0 ? parseInt(value) : 0 }));
    };
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, service_date: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const total_headcount = formState.men + formState.women + formState.youth_boys + formState.youth_girls + formState.children_boys + formState.children_girls;
        const newRecord: AttendanceRecord = {
            id: `att-${Date.now()}`,
            ...formState,
            total_headcount,
        };
        
        // Prepend to show the latest first
        setAttendanceData(prev => [newRecord, ...prev]);
        showToast('Attendance recorded successfully!');
        setIsModalOpen(false);
        setFormState(initialFormState);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Attendance Management</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 inline-block mr-1" /> Record Attendance
                </Button>
            </div>
            <Card className="!p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Men</th>
                                <th className="px-6 py-3">Women</th>
                                <th className="px-6 py-3">Youth</th>
                                <th className="px-6 py-3">Children</th>
                                <th className="px-6 py-3">YouTube</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((record) => (
                              <tr key={record.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{formatDate(record.service_date)}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{record.total_headcount}</td>
                                <td className="px-6 py-4">{record.men}</td>
                                <td className="px-6 py-4">{record.women}</td>
                                <td className="px-6 py-4">{record.youth_boys + record.youth_girls}</td>
                                <td className="px-6 py-4">{record.children_boys + record.children_girls}</td>
                                <td className="px-6 py-4">{record.youtube}</td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Attendance">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Date</label>
                            <input type="date" name="service_date" value={formState.service_date} onChange={handleDateChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Men</label>
                            <input type="number" name="men" value={formState.men} onChange={handleInputChange} min="0" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Women</label>
                            <input type="number" name="women" value={formState.women} onChange={handleInputChange} min="0" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Youth (Boys)</label>
                            <input type="number" name="youth_boys" value={formState.youth_boys} onChange={handleInputChange} min="0" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Youth (Girls)</label>
                            <input type="number" name="youth_girls" value={formState.youth_girls} onChange={handleInputChange} min="0" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Children (Boys)</label>
                            <input type="number" name="children_boys" value={formState.children_boys} onChange={handleInputChange} min="0" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Children (Girls)</label>
                            <input type="number" name="children_girls" value={formState.children_girls} onChange={handleInputChange} min="0" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">YouTube Views</label>
                            <input type="number" name="youtube" value={formState.youtube} onChange={handleInputChange} min="0" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Record Attendance</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Attendance;