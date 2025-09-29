import { Story, ChatMessage, CallLog, CommunityInfo, Channel } from '../types';

export const chatContacts = [
    { 
        id: 1, 
        name: 'Pastor John Odeyemi', 
        avatar: 'https://avatar.iran.liara.run/public/boy?username=john', 
        lastMessage: 'Excellent. See you at the meeting.', 
        time: '10:42 AM', 
        unread: 2, 
        online: true, 
        status: 'Online' 
    },
    { 
        id: 2, 
        name: 'Grace Adebayo', 
        avatar: 'https://avatar.iran.liara.run/public/girl?username=grace', 
        lastMessage: 'Thank you for the encouragement!', 
        time: '9:15 AM', 
        unread: 0, 
        online: true,
        status: 'Typing...'
    },
    { 
        id: 4, 
        name: 'Samuel Okoro', 
        avatar: 'https://avatar.iran.liara.run/public/boy?username=samuel', 
        lastMessage: 'I will be there. Thanks.', 
        time: 'Yesterday', 
        unread: 0, 
        online: false,
        status: 'Last seen yesterday at 8:22 PM'
    },
];

export const chatGroups = [
     { 
        id: 3, 
        name: 'Youth Fellowship Group', 
        avatar: 'https://avatar.iran.liara.run/public/25', 
        lastMessage: 'David: We will be having our weekly meeting...', 
        time: 'Yesterday', 
        unread: 5, 
        online: false,
        status: '42 Members'
    },
];


export const chatMessages: Record<string, ChatMessage[]> = {
    '1': [
        { id: 'msg1-1', from: 'them', text: 'Good morning, brother. I hope you are well.', time: '10:30 AM', status: 'read' },
        { id: 'msg1-2', from: 'me', text: 'Good morning, Pastor. I am doing great, thank you. How was the trip?', time: '10:31 AM', status: 'read' },
        { id: 'msg1-3', from: 'them', type: 'image', content: 'https://picsum.photos/seed/event/400/300', text: 'Here is the flyer for the ministers\' meeting. Please review.', time: '10:40 AM', status: 'read', replyCount: 2, threadId: 'thread-1-3' },
        { id: 'msg1-4', from: 'me', text: 'Looks great, Pastor. I have sent it to the printers.', time: '10:41 AM', status: 'read', parentId: 'msg1-3', threadId: 'thread-1-3' },
        { id: 'msg1-5', from: 'them', text: 'Excellent. See you at the meeting.', time: '10:42 AM', status: 'delivered', parentId: 'msg1-3', threadId: 'thread-1-3' },
        { id: 'msg1-6', from: 'me', text: 'Sounds good!', time: '10:43 AM', status: 'read', reactions: { '👍': 1 } },
    ],
    '2': [
        { id: 'msg2-1', from: 'me', text: 'Your testimony was so powerful, sister Grace!', time: '9:14 AM', status: 'read' },
        { id: 'msg2-2', from: 'them', text: 'Thank you for the encouragement!', time: '9:15 AM', status: 'sent' },
    ],
    '3': [
        { id: 'msg3-1', from: 'them', author: 'David Member', text: 'We will be having our weekly meeting tomorrow at 5 PM. Please be punctual.', time: 'Yesterday', status: 'read', replyCount: 1, threadId: 'thread-3-1', reactions: { '👍': 12, '🙏': 5 } },
        { id: 'msg3-2', from: 'them', author: 'Grace Adebayo', text: 'I will be there!', time: 'Yesterday', status: 'read', parentId: 'msg3-1', threadId: 'thread-3-1' },
    ]
};

export const mockStories: Story[] = [
    { id: 'story-1', author: 'Grace Adebayo', avatar: 'https://avatar.iran.liara.run/public/girl?username=grace', viewed: false },
    { id: 'story-2', author: 'Samuel Okoro', avatar: 'https://avatar.iran.liara.run/public/boy?username=samuel', viewed: false },
    { id: 'story-3', author: 'Admin', avatar: 'https://avatar.iran.liara.run/public/8', viewed: true },
    { id: 'story-4', author: 'David Member', avatar: 'https://avatar.iran.liara.run/public/boy?username=david', viewed: true },
    { id: 'story-5', author: 'Patience Money', avatar: 'https://avatar.iran.liara.run/public/girl?username=patience', viewed: true },
];

export const mockCommunities: CommunityInfo[] = [
    {
        id: 'comm1',
        name: 'Gbagada Regional Community',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05nTe-pfM_2-iS_e_mGBCu-2e2oX8K5b5Q&s',
        description: 'Official community for all groups in Gbagada Region.'
    },
    {
        id: 'comm2',
        name: 'National Youth Fellowship',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctG3G-Jg_cso03n2hP3Dw820f-OQQE3yQeQ&s',
        description: 'Connecting all youth across the nation for fellowship and growth.'
    }
];

export const mockChannels: Channel[] = [
    {
        id: 'chan1',
        name: 'Pastor W.F. Kumuyi (Official)',
        avatar: 'https://avatar.iran.liara.run/public/8',
        lastUpdate: 'Join us for the GCK broadcast tonight...',
        muted: false,
    },
    {
        id: 'chan2',
        name: 'DCLM News & Updates',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_3-4rW240V_Y23xESv2LgZL_o-uYj8veaA&s',
        lastUpdate: 'The new church building project has commenced.',
        muted: true,
    }
];

export const mockCalls: CallLog[] = [
    {
        id: 'call1',
        contactName: 'Grace Adebayo',
        avatar: 'https://avatar.iran.liara.run/public/girl?username=grace',
        type: 'video',
        direction: 'missed',
        time: 'Today, 11:05 AM'
    },
    {
        id: 'call2',
        contactName: 'Samuel Okoro',
        avatar: 'https://avatar.iran.liara.run/public/boy?username=samuel',
        type: 'voice',
        direction: 'outgoing',
        time: 'Today, 9:30 AM'
    },
    {
        id: 'call3',
        contactName: 'Pastor John Odeyemi',
        avatar: 'https://avatar.iran.liara.run/public/boy?username=john',
        type: 'voice',
        direction: 'incoming',
        time: 'Yesterday, 4:15 PM'
    }
];