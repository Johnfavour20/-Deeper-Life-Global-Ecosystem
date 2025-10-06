import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { mockLocations, mockUsers, mockSmallGroups } from '../data/mockData';
import { User, SmallGroup } from '../types';
import { MapPin, Languages, Users, UserCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { rolePrivilegeLevels } from '../constants';

// --- Tab Components ---

const LocationsTab: React.FC = () => {
    const mockNearestChurches = [
        {
            name: "DLBC Port Harcourt Main",
            address: "15 Aba Road, Port Harcourt, Rivers State",
            distance: "2.1 km",
            services: ["Sun 7AM", "Sun 4PM", "Wed 6PM", "Fri 6PM"],
            language: "English",
            capacity: 85
        },
        {
            name: "DLBC GRA Port Harcourt",
            address: "45 Forces Avenue, GRA, Port Harcourt",
            distance: "3.8 km", 
            services: ["Sun 8AM", "Sun 5PM", "Wed 6:30PM"],
            language: "English",
            capacity: 92
        },
        {
            name: "DLBC Trans-Amadi",
            address: "12 Pipeline Road, Trans-Amadi, Port Harcourt",
            distance: "5.2 km",
            services: ["Sun 7:30AM", "Sun 4:30PM", "Wed 6PM"],
            language: "English",
            capacity: 67
        }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 h-96 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 font-medium">Interactive Map</p>
                        <p className="text-gray-500 text-sm">Showing Deeper Life churches worldwide</p>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-50">45,000+ Churches Found</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Across 183 nations</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <input 
                                type="text" 
                                placeholder="Enter location..."
                                className="border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg px-3 py-2 text-sm w-48"
                            />
                            <button className="bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors text-sm">
                                <MapPin size={16} className="inline mr-1" />
                                Use My Location
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <Card>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Nearest Churches</h2>
                <div className="space-y-4">
                {mockNearestChurches.map((church, i) => (
                    <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">{church.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{church.address}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 flex-wrap gap-x-2">
                            <span><MapPin size={14} className="inline mr-1" />{church.distance}</span>
                            <span className="hidden sm:inline">•</span>
                            <span><Languages size={14} className="inline mr-1" />{church.language}</span>
                             <span className="hidden sm:inline">•</span>
                            <span><Users size={14} className="inline mr-1" />{church.capacity}% capacity</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {church.services.map((service, j) => (
                            <span key={j} className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                                {service}
                            </span>
                            ))}
                        </div>
                        </div>
                        <div className="w-full sm:w-auto flex flex-col sm:space-y-2">
                        <button className="bg-primary-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-800 transition-colors">
                            Get Directions
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </Card>
        </div>
    );
};


const MembersTab: React.FC = () => {
    const { userRole } = useAuth();
    const [members] = useState<User[]>(mockUsers);
    const isPastor = rolePrivilegeLevels[userRole] >= rolePrivilegeLevels.group_pastor;
    
    return (
        <Card className="!p-0">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Phone</th>
                            {isPastor && <th className="px-6 py-3">Small Group</th>}
                            {isPastor && <th className="px-6 py-3">Profession</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((user) => (
                            <tr key={user.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{user.full_name || user.username}</td>
                            <td className="px-6 py-4 capitalize whitespace-nowrap">{user.role.replace('_', ' ')}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.phone_number || '-'}</td>
                             {isPastor && <td className="px-6 py-4 whitespace-nowrap">{user.smallGroup || 'N/A'}</td>}
                             {isPastor && <td className="px-6 py-4 whitespace-nowrap">{user.profession || 'N/A'}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const GroupsTab: React.FC = () => {
    const [groups] = useState<SmallGroup[]>(mockSmallGroups);

    return (
        <Card className="!p-0">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Group Name</th>
                            <th className="px-6 py-3">Leader</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group) => (
                            <tr key={group.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{group.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{group.leader}</td>
                            <td className="px-6 py-4 capitalize whitespace-nowrap">{group.location}</td>
                            <td className="px-6 py-4 font-semibold whitespace-nowrap">{group.memberCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

// --- Main Directory Component ---

type DirectoryTab = 'locations' | 'members' | 'groups';

const Directory: React.FC = () => {
    const { userRole } = useAuth();
    const [activeTab, setActiveTab] = useState<DirectoryTab>('locations');
    const isPastor = rolePrivilegeLevels[userRole] >= rolePrivilegeLevels.group_pastor;

    const renderContent = () => {
        switch (activeTab) {
            case 'locations': return <LocationsTab />;
            case 'members': return <MembersTab />;
            case 'groups': return <GroupsTab />;
            default: return <LocationsTab />;
        }
    };
    
    const TabButton: React.FC<{tabName: DirectoryTab, label: string}> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 focus:outline-none ${
                activeTab === tabName
                    ? 'border-b-2 border-primary-700 text-primary-700'
                    : 'text-gray-500 hover:text-primary-700'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50 mb-6">Church Locator & Directory</h1>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <TabButton tabName="locations" label="Locations" />
                    <TabButton tabName="members" label="Members" />
                    {isPastor && <TabButton tabName="groups" label="Groups" />}
                </nav>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default Directory;
