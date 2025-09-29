import { CommunityPost, UserRole } from './types';

export const privilegeLevels: Record<UserRole, string> = {
    'member': 'Member',
    'usher': 'Usher',
    'financial_secretary': 'Financial Secretary',
    'group_pastor': 'Group Pastor',
    'group_admin': 'Group Admin',
    'regional_pastor': 'Regional Pastor',
    'regional_admin': 'Regional Admin',
    'national_overseer': 'National Overseer',
    'g_s': 'General Superintendent'
};

export const rolePrivilegeLevels: Record<UserRole, number> = {
    'member': 1,
    'usher': 2,
    'financial_secretary': 3,
    'group_pastor': 4,
    'group_admin': 4,
    'regional_pastor': 5,
    'regional_admin': 5,
    'national_overseer': 6,
    'g_s': 7
};

export const globalStats = {
    totalMembers: '50.2M',
    activeNations: '183',
    liveViewers: '2.4M',
    dailyGHS: '260+',
    stsCompletion: '89%',
    onlineChurches: '45,000+'
};

export const allHymns = [
    { number: "GHS 1", title: "Holy, Holy, Holy", key: "Eb Major", category: "Adoration" },
    { number: "GHS 45", title: "Great is Thy Faithfulness", key: "G Major", category: "Assurance" },
    { number: "GHS 127", title: "Amazing Grace", key: "D Major", category: "Grace" },
    { number: "GHS 89", title: "How Great Thou Art", key: "C Major", category: "Adoration" },
    { number: "GHS 156", title: "Blessed Assurance", key: "F Major", category: "Assurance" },
    { number: "GHS 203", title: "What a Friend We Have in Jesus", key: "Bb Major", category: "Prayer" },
    { number: "GHS 18", title: "To God Be The Glory", key: "G Major", category: "Adoration" },
    { number: "GHS 77", title: "It Is Well With My Soul", key: "Db Major", category: "Comfort" },
];

// FIX: Explicitly typed the array with `CommunityPost[]` to ensure type safety and resolve mismatches where it's used.
export const communityPosts: CommunityPost[] = [
    { 
        id: 1, 
        author: 'Grace Adebayo', 
        avatar: 'https://avatar.iran.liara.run/public/girl?username=grace', 
        time: '2 hours ago', 
        content: 'What a powerful message during the GCK! My faith has been renewed and I feel ready to take on any challenge. Praise the Lord! 🙌 #GCK #Testimony #DeeperLife', 
        likes: 125, 
        comments: 14,
        shares: 22,
        category: 'Testimonies' 
    },
     {
        id: 7,
        author: 'Patience Money',
        avatar: 'https://avatar.iran.liara.run/public/girl?username=patience',
        time: '3 hours ago',
        content: 'This testimony from Sister Grace is so uplifting! It reminds me of the session we had at the last women\'s conference.',
        likes: 67,
        comments: 9,
        shares: 11,
        category: 'Testimonies',
        quote: { 
            author: 'Grace Adebayo',
            avatar: 'https://avatar.iran.liara.run/public/girl?username=grace',
            time: '2 hours ago',
            content: 'What a powerful message during the GCK! My faith has been renewed and I feel ready to take on any challenge. Praise the Lord! 🙌 #GCK #Testimony #DeeperLife',
        }
    },
    { 
        id: 2, 
        author: 'Samuel Okoro', 
        avatar: 'https://avatar.iran.liara.run/public/boy?username=samuel', 
        time: '5 hours ago', 
        content: 'Please join me in prayer for my cousin who is undergoing surgery tomorrow morning. We are trusting God for a successful procedure and quick recovery. 🙏', 
        likes: 230, 
        comments: 88, 
        shares: 45,
        category: 'Prayer Requests' 
    },
    {
        id: 3,
        author: 'Youth Fellowship',
        avatar: 'https://avatar.iran.liara.run/public/25',
        time: '8 hours ago',
        content: "So excited for the upcoming National Youth Conference! Here are some highlights from last year. Who's coming this year? Let us know in the comments! #YouthConference2024 #DeeperLifeYouth",
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1948&auto=format&fit=crop',
        likes: 310,
        comments: 56,
        shares: 78,
        category: 'Announcements'
    },
    {
        id: 5,
        author: 'John Doe',
        avatar: 'https://avatar.iran.liara.run/public/boy?username=johndoe',
        time: '1 day ago',
        content: 'Just finished reading the Daily Manna for today on "HE IS MINDFUL OF YOU". A profound reminder that even in the vastness of His creation, God\'s attention to detail on each of our lives is intimate and personal. Truly humbling.',
        likes: 95,
        comments: 12,
        shares: 8,
        category: 'Discussion',
        threadId: 'thread-1',
        isThreadStart: true,
    },
    {
        id: 6,
        author: 'John Doe',
        avatar: 'https://avatar.iran.liara.run/public/boy?username=johndoe',
        time: '1 day ago',
        content: 'The part that stood out to me was: "He is aware of it and will surely see you through. Just hold on to His promises." This is a word in season for someone today. #DailyManna #Encouragement',
        likes: 42,
        comments: 5,
        shares: 3,
        category: 'Discussion',
        threadId: 'thread-1',
    },
    {
        id: 4,
        author: 'Admin',
        avatar: 'https://avatar.iran.liara.run/public/8',
        time: '1 day ago',
        content: 'Quick poll for our members: Which GHS Hymn has been most impactful for you this week?',
        poll: {
            question: 'Which GHS Hymn has been most impactful this week?',
            options: [
                { id: 'poll1', text: 'GHS 9 - Great is Thy Faithfulness', votes: 152 },
                { id: 'poll2', text: 'GHS 18 - Blessed Assurance', votes: 98 },
                { id: 'poll3', text: 'GHS 24 - It Is Well With My Soul', votes: 210 },
                { id: 'poll4', text: 'Other (comment below!)', votes: 45 },
            ]
        },
        likes: 453,
        comments: 112,
        shares: 61,
        category: 'Discussion'
    },
];

export const churchEvents = [
    { title: "GCK Global Crusade with Pastor Kumuyi", date: "Dec 28, 2023", location: "Live from Lagos, Nigeria", type: "Global" },
    { title: "Local Church Anniversary", date: "Jan 15, 2024", location: "Gbagada HQ", type: "Local" },
    { title: "National Youth Conference", date: "Jan 20, 2024", location: "Abuja, Nigeria", type: "Youth" },
    { title: "Ministers' Leadership Training", date: "Feb 05, 2024", location: "Online", type: "Ministry" },
];

export const analyticsData = {
    membershipGrowth: [35, 38, 40, 42, 45, 47, 50],
    memberDemographics: { labels: ['Youth', 'Adult', 'Elder'], data: [45, 40, 15] },
    attendanceByRegion: { labels: ['Africa', 'Europe', 'North America', 'Asia', 'Others'], data: [75, 10, 8, 5, 2] }
};

export const blockchainTransactions = [
    { txHash: '0x1a2b...c3d4', from: 'Member Wallet', to: 'Tithe & Offering', amount: 50.00, timestamp: '2 mins ago' },
    { txHash: '0x5e6f...g7h8', from: 'GCK Fund', to: 'Missionary Support', amount: 1200.00, timestamp: '5 mins ago' },
    { txHash: '0x9i0j...k1l2', from: 'Member Wallet', to: 'Building Project', amount: 200.00, timestamp: '8 mins ago' },
    { txHash: '0x3m4n...o5p6', from: 'Regional Fund', to: 'Welfare', amount: 500.00, timestamp: '12 mins ago' },
];