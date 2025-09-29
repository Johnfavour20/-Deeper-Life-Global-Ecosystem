import { Notification } from '../types';

export const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'sermon',
        title: 'New Message Available',
        description: 'Pastor W.F. Kumuyi\'s latest message, "Faith That Moves Mountains," is now available.',
        time: '2 hours ago',
        read: false,
    },
    {
        id: '2',
        type: 'prayer',
        title: 'New Prayer Request',
        description: 'Samuel Okoro has requested prayer for his cousin\'s upcoming surgery.',
        time: '5 hours ago',
        read: false,
    },
    {
        id: '3',
        type: 'announcement',
        title: 'Youth Conference Registration',
        description: 'Registration for the National Youth Conference is now open. Don\'t miss out!',
        time: '8 hours ago',
        read: true,
    },
    {
        id: '4',
        type: 'event',
        title: 'Event Reminder: Local Church Anniversary',
        description: 'Our Local Church Anniversary is this Sunday at Gbagada HQ.',
        time: '1 day ago',
        read: true,
    }
];
