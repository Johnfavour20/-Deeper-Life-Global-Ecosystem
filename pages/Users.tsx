import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { mockUsers } from '../data/mockData';
import { User, UserRole, MinistryDepartment } from '../types';
import { Plus, Trash2, Search } from 'lucide-react';

const initialFormState: Omit<User, 'id'> = {
    username: '', password: '', role: 'usher', full_name: '', phone_number: '', email: '', gender: 'male', department: 'General'
};

const Users: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState(initialFormState);
    const { showToast } = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = searchTerm.toLowerCase() === '' ||
                user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, roleFilter]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = {
            id: `user-${Date.now()}`,
            ...formState,
        };
        
        setUsers(prev => [newUser, ...prev]);
        showToast('User created successfully!');
        setIsModalOpen(false);
        setFormState(initialFormState);
    };
    
    const handleDelete = (userId: string) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            setUsers(prev => prev.filter(u => u.id !== userId));
            showToast('User deleted successfully!', 'success');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">User Management</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 inline-block mr-1" /> Add User
                </Button>
            </div>

            <Card className="!p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or username..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                     <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 py-2 px-3"
                    >
                        <option value="all">All Roles</option>
                        <option value="member">Member</option>
                        <option value="usher">Usher</option>
                        <option value="financial_secretary">Financial Secretary</option>
                        <option value="group_admin">Group Admin</option>
                        <option value="regional_admin">Regional Admin</option>
                    </select>
                </div>
            </Card>

            <Card className="!p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                             <tr>
                                <th className="px-6 py-3">Username</th>
                                <th className="px-6 py-3">Full Name</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                              <tr key={user.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.full_name || '-'}</td>
                                <td className="px-6 py-4 capitalize whitespace-nowrap">{user.role.replace(/_/g, ' ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.department || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.phone_number || '-'}</td>
                                <td className="px-6 py-4">
                                    {user.username !== currentUser?.username && (
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/50 px-2">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                            <input type="text" name="username" value={formState.username} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input type="password" name="password" value={formState.password || ''} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="full_name" value={formState.full_name} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                            <input type="tel" name="phone_number" value={formState.phone_number} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input type="email" name="email" value={formState.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                             <select name="gender" value={formState.gender} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                             <select name="role" value={formState.role} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent">
                                <option value="usher">Usher</option>
                                <option value="financial_secretary">Financial Secretary</option>
                                <option value="group_admin">Group Admin</option>
                                <option value="regional_admin">Regional Admin</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                             <select name="department" value={formState.department} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-transparent">
                                <option value="General">General</option>
                                <option value="Children">Children</option>
                                <option value="Youth">Youth</option>
                                <option value="Young Adults">Young Adults</option>
                                <option value="Adult">Adult</option>
                                <option value="Specialized">Specialized</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Add User</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Users;
