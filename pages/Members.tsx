
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { mockUsers } from '../data/mockData';
import { User } from '../types';

const Members: React.FC = () => {
    // In a real app, you'd fetch all users/members, not just admins/staff
    const [members] = useState<User[]>(mockUsers);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Member Directory</h1>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Gender</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((user) => (
                              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{user.full_name || user.username}</td>
                                <td className="px-6 py-4 capitalize">{user.gender}</td>
                                <td className="px-6 py-4">{user.phone_number || '-'}</td>
                                <td className="px-6 py-4">{user.email || '-'}</td>
                                <td className="px-6 py-4 capitalize">{user.role.replace('_', ' ')}</td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Members;
