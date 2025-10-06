// FIX: Imported missing types to support new mock data for Sermons, Financials, and Directory pages.
// FIX: Imported GCKEvent type to support new mock data.
import { User, AttendanceRecord, PaymentRecord, Project, AccountDetail, Sermon, FinancialRecord, Location, MinistryDepartment, PrayerRequest, MarketplaceItem, BlogPost, GCKEvent, SmallGroup, Badge, MentorshipProfile, BibleStory, BibleHero, BibleQuest, BibleVideo, QuizQuestion, Quiz, CodingQuest, CodeBlock } from '../types';
import { Award, Shield, Star, BookOpen, UserCheck, CheckSquare, Brain, Trophy, MoveUp, MoveLeft, Repeat, PawPrint, Ship } from 'lucide-react';

export const mockUsers: User[] = [
    { id: '1', username: 'reg_admin', password: 'password123', role: 'regional_admin', full_name: 'Dr. John Admin', phone_number: '08012345678', email: 'reg.admin@dclm.org', gender: 'male', department: 'Adult', profession: 'University Lecturer', location: 'Lagos', smallGroup: 'Gbagada Group 1' },
    { id: '2', username: 'grp_admin', role: 'group_admin', full_name: 'Mrs. Grace Leader', phone_number: '08023456789', email: 'grp.admin@dclm.org', gender: 'female', department: 'Children', profession: 'School Principal', location: 'Lagos', smallGroup: 'Gbagada Group 2' },
    { id: '3', username: 'usher_user', role: 'usher', full_name: 'Samuel Clerk', phone_number: '08034567890', email: 'sec.user@dclm.org', gender: 'male', department: 'General', profession: 'Accountant', location: 'Abuja', smallGroup: 'Abuja Central Group 5' },
    { id: '4', username: 'financial_secretary_user', role: 'financial_secretary', full_name: 'Patience Money', phone_number: '08045678901', email: 'acc.user@dclm.org', gender: 'female', department: 'General', profession: 'Bank Manager', location: 'Port Harcourt', smallGroup: 'PH Group 3' },
    { id: '5', username: 'member1', role: 'usher', full_name: 'David Member', phone_number: '08056789012', email: 'member1@dclm.org', gender: 'male', department: 'Youth', profession: 'Software Engineer', location: 'Lagos', smallGroup: 'Gbagada Group 1' },
    { id: '6', username: 'prof_member', role: 'member', full_name: 'Prof. Esther Adeoye', phone_number: '08061234567', email: 'esther.a@dclm.org', gender: 'female', department: 'Adult', profession: 'Medical Doctor', location: 'Abuja', smallGroup: 'Abuja Central Group 2' },
    { id: '7', username: 'youth_member', role: 'member', full_name: 'Benjamin Dada', phone_number: '08076543210', email: 'ben.d@dclm.org', gender: 'male', department: 'Youth', profession: 'Student', location: 'Lagos', smallGroup: 'Gbagada Youth Group' },
];

export const mockSmallGroups: SmallGroup[] = [
    { id: 'sg1', name: 'Gbagada Group 1', leader: 'Dr. John Admin', location: 'Gbagada', memberCount: 15 },
    { id: 'sg2', name: 'Gbagada Group 2', leader: 'Mrs. Grace Leader', location: 'Gbagada', memberCount: 12 },
    { id: 'sg3', name: 'Abuja Central Group 5', leader: 'Bro. Emmanuel', location: 'Abuja', memberCount: 20 },
    { id: 'sg4', name: 'PH Group 3', leader: 'Sis. Joy', location: 'Port Harcourt', memberCount: 18 },
];

export const mockBadges: Badge[] = [
    { id: 'b1', title: '7-Day Streak', description: 'Completed a Bible Adventure for 7 days in a row.', icon: Star, unlocked: true, criteria: 'Log in 7 days in a row.' },
    { id: 'b2', title: 'Story Teller', description: 'Completed all the Bible Adventure stories.', icon: BookOpen, unlocked: false, criteria: 'Finish every Bible story.' },
    { id: 'b3', title: 'Quiz Whiz', description: 'Scored 100% on the "Who Am I?" Bible quiz.', icon: Brain, unlocked: false, criteria: 'Get a perfect score on the "Who Am I?" quiz.' },
    { id: 'b4', title: 'Perfect Month', description: 'Completed a quest every day for a full month.', icon: Shield, unlocked: false, criteria: 'Complete a quest every day for 30 days.' },
    { id: 'b5', title: 'Genesis Graduate', description: 'Completed the "Creation" Bible Adventure.', icon: Award, unlocked: true, criteria: 'Complete "The Beginning" story.' },
    { id: 'b6', title: 'Trivia Champion', description: 'Answered 10 quiz questions correctly.', icon: Trophy, unlocked: false, criteria: 'Get 10 correct answers in Bible Trivia.' },
    { id: 'b7', title: 'First Steps', description: 'Completed your first coding quest.', icon: PawPrint, unlocked: true, criteria: 'Complete "The First Journey".' },
    { id: 'b8', title: 'Awesome Automator', description: 'Used your first loop block.', icon: Repeat, unlocked: false, criteria: 'Complete "Marching Two by Two".' },
];

export const mockMentorshipProfiles: MentorshipProfile[] = [
    { userId: '6', name: 'Prof. Esther Adeoye', avatar: 'https://avatar.iran.liara.run/public/girl?username=esther', role: 'Mentor', title: 'Medical Doctor', expertise: ['Medicine', 'Public Health', 'Career Growth'], bio: '20+ years in the medical field. Passionate about helping young believers navigate their careers with integrity.' },
    { userId: '1', name: 'Dr. John Admin', avatar: 'https://avatar.iran.liara.run/public/boy?username=johnadmin', role: 'Mentor', title: 'University Lecturer', expertise: ['Academia', 'Research', 'Leadership'], bio: 'Guiding students and young professionals in academic and spiritual excellence for over 15 years.' },
    { userId: '5', name: 'David Member', avatar: 'https://avatar.iran.liara.run/public/boy?username=david', role: 'Mentor', title: 'Senior Software Engineer', expertise: ['Technology', 'Software Dev', 'Project Management'], bio: 'Navigating the tech industry as a committed Christian. Happy to share insights on faith and work.' },
    { userId: '7', name: 'Benjamin Dada', avatar: 'https://avatar.iran.liara.run/public/boy?username=benjamin', role: 'Mentee', title: 'Computer Science Student', expertise: [], bio: 'Looking for guidance on starting a career in tech while keeping my faith strong.' },
];

export const mockFriendRequests = [
  { id: 'fr1', name: 'Esther Adeoye', avatar: 'https://avatar.iran.liara.run/public/girl?username=esther', mutualFriends: 5 },
  { id: 'fr2', name: 'Benjamin Dada', avatar: 'https://avatar.iran.liara.run/public/boy?username=benjamin', mutualFriends: 2 },
];

export const mockSuggestedUsers = [
  { id: 'su1', name: 'Patience Money', avatar: 'https://avatar.iran.liara.run/public/girl?username=patience', reason: 'Followed by Samuel Okoro' },
  { id: 'su2', name: 'David Member', avatar: 'https://avatar.iran.liara.run/public/boy?username=david', reason: 'Active in Youth Fellowship' },
  { id: 'su3', name: 'Esther Kumuyi', avatar: 'https://avatar.iran.liara.run/public/girl?username=estherk', reason: 'New Member' },
];

export const mockSuggestedGroups = [
    { id: 'sg1', name: 'Gbagada Men\'s Fellowship', avatar: 'https://images.unsplash.com/photo-1579226922372-b35b62b02a28?q=80&w=2070&auto=format&fit=crop', members: '1.2k members' },
    { id: 'sg2', name: 'Global Crusade Fans', avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', members: '25.8k members' },
];

export const mockPrayerRequests: PrayerRequest[] = [
    { id: 'pr1', author: 'Samuel Okoro', avatar: 'https://avatar.iran.liara.run/public/boy?username=samuel', request: 'Please pray for my cousin who is undergoing surgery tomorrow. Praying for the hands of the surgeons and for a quick recovery.', timestamp: '2 hours ago', prayerCount: 142, isAnonymous: false },
    { id: 'pr2', author: 'A Sister in Christ', avatar: 'https://avatar.iran.liara.run/public/45', request: 'Unspoken prayer request for my family. God knows the details. Please just lift us up in prayer for peace and guidance.', timestamp: '8 hours ago', prayerCount: 210, isAnonymous: true },
    { id: 'pr3', author: 'Youth Fellowship', avatar: 'https://avatar.iran.liara.run/public/25', request: 'Pray for the upcoming National Youth Conference, for journey mercies for all attendees and for a mighty move of God.', timestamp: '1 day ago', prayerCount: 580, isAnonymous: false },
];

export const mockMarketplaceItems: MarketplaceItem[] = [
    { id: 'mp1', title: 'Search The Scriptures (Vol 1)', price: 1500, seller: 'DCLM Press', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop', category: 'Books' },
    { id: 'mp2', title: 'GCK Choir Exclusive Album', price: 1000, seller: 'DCLM Music', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop', category: 'Music' },
    { id: 'mp3', title: '"Holiness unto the Lord" T-Shirt', price: 3500, seller: 'Grace Apparel', imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop', category: 'Apparel' },
    { id: 'mp4', title: 'Hand-painted Cross Artwork', price: 7000, seller: 'Esther Arts', imageUrl: 'https://images.unsplash.com/photo-1506803393123-b6399a9a3a93?q=80&w=2070&auto=format&fit=crop', category: 'Art' },
    { id: 'mp5', title: 'IT Consulting (1hr)', price: 25000, seller: 'David Member', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop', category: 'Professional Service' },
];

export const mockBlogPosts: BlogPost[] = [
    { id: 'bp1', title: 'Finding Stillness in a Noisy World', author: 'Grace Adebayo', authorAvatar: 'https://avatar.iran.liara.run/public/girl?username=grace', timestamp: 'Oct 28, 2023', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop', snippet: 'In an age of constant notifications and endless noise, how do we cultivate a quiet heart before the Lord? Let\'s explore the biblical principle of stillness...', readTime: 5 },
    { id: 'bp2', title: 'Faith in the Workplace: A Doctor\'s Perspective', author: 'Prof. Esther Adeoye', authorAvatar: 'https://avatar.iran.liara.run/public/girl?username=esther', timestamp: 'Oct 25, 2023', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop', snippet: 'Balancing the demands of a medical career with a deep commitment to Christ is a unique challenge. Here are some principles that have guided my path.', readTime: 7 },
    { id: 'bp3', title: 'A Youth on Fire for God', author: 'David Member', authorAvatar: 'https://avatar.iran.liara.run/public/boy?username=david', timestamp: 'Oct 22, 2023', imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1948&auto=format&fit=crop', snippet: 'What does it mean to be a young Christian in today\'s world? A personal reflection on navigating challenges and staying committed to faith.', readTime: 4 },
];


export const mockAttendance: AttendanceRecord[] = [
    { id: 'att-1', service_date: '2023-10-22', men: 50, women: 65, youth_boys: 20, youth_girls: 25, children_boys: 30, children_girls: 35, new_converts: 5, youtube: 150, total_headcount: 225 },
    { id: 'att-2', service_date: '2023-10-15', men: 48, women: 62, youth_boys: 18, youth_girls: 22, children_boys: 28, children_girls: 33, new_converts: 2, youtube: 145, total_headcount: 211 },
    { id: 'att-3', service_date: '2023-10-08', men: 52, women: 68, youth_boys: 22, youth_girls: 28, children_boys: 32, children_girls: 38, new_converts: 8, youtube: 160, total_headcount: 240 },
];

export const mockPayments: PaymentRecord[] = [
    { id: 'pay-1', date: '2023-10-22', payment_type: 'offering', amount: 55000, description: 'Sunday Offering', account_details: 'Main Account - 1234567890' },
    { id: 'pay-2', date: '2023-10-20', payment_type: 'tithe', amount: 150000, description: 'Monthly Tithe', account_details: 'Main Account - 1234567890', receipt_path: '/receipts/rec-001.pdf' },
    { id: 'pay-3', date: '2023-10-18', payment_type: 'building_fund', amount: 250000, description: 'Church Building Project', account_details: 'Project Account - 0987654321', receipt_path: '/receipts/rec-002.pdf' },
    { id: 'pay-4', date: '2023-10-15', payment_type: 'offering', amount: 52000, description: 'Sunday Offering', account_details: 'Main Account - 1234567890' },
];

export const mockProjects: Project[] = [
    { id: 'proj-1', project_name: 'New Cathedral Building', target_amount: 50000000, current_amount: 15000000, start_date: '2023-01-01', status: 'active' },
    { id: 'proj-2', project_name: 'Missionary Support Fund', target_amount: 5000000, current_amount: 5000000, start_date: '2023-06-01', status: 'completed' },
    { id: 'proj-3', project_name: 'Community Outreach Bus', target_amount: 12000000, current_amount: 4500000, start_date: '2023-09-15', status: 'active' },
];

export const mockAccounts: AccountDetail[] = [
    { id: 'acc-1', account_type: 'main', account_name: 'DCLM Main Account', account_number: '1234567890', bank_name: 'First Bank' },
    { id: 'acc-2', account_type: 'project', account_name: 'DCLM Building Project', account_number: '0987654321', bank_name: 'GTBank' },
];

// FIX: Added mockSermons data to resolve import error in Sermons.tsx.
export const mockSermons: Sermon[] = [
    {
        id: 'sermon-1',
        title: 'Faith That Moves Mountains',
        preacher: 'W.F. Kumuyi',
        date: '2023-10-22',
        content: 'This sermon explores the depths of faith as described in Matthew 17:20. True faith, even as small as a mustard seed, has the power to overcome insurmountable obstacles. We will delve into what it means to cultivate such faith through prayer, study of the Word, and complete trust in God\'s promises. It is not about the size of our faith, but the size of our God. We will look at biblical examples of men and women whose faith accomplished the impossible, and learn how to apply these principles to our modern-day challenges, whether they be in our personal lives, our families, or our communities. The key is to shift our focus from the mountain to the Mountain Mover.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3',
        target_department: 'General',
        isFeatured: true,
        series: 'GCK Global'
    },
    {
        id: 'sermon-2',
        title: 'The Power of Forgiveness',
        preacher: 'W.F. Kumuyi',
        date: '2023-10-15',
        content: 'Based on the parable of the unforgiving servant in Matthew 18, this message highlights the critical importance of forgiveness in the life of a believer. We have been forgiven an immeasurable debt by God, and in turn, we are called to extend that same grace to others. Holding onto bitterness and resentment not only hinders our relationship with God but also brings torment upon ourselves. This sermon will provide practical steps on how to release bitterness, embrace forgiveness, and walk in the freedom that Christ has purchased for us. Forgiveness is not a feeling; it is a choice, an act of the will, empowered by the Holy Spirit. Let us choose to forgive as we have been forgiven.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3',
        target_department: 'Adult',
        series: 'Faith Series'
    },
    {
        id: 'sermon-3',
        title: 'Raising Godly Children',
        preacher: 'Esther Kumuyi',
        date: '2023-10-10',
        content: 'A practical sermon on the biblical principles of parenting found in Proverbs 22:6. This message is for parents, guardians, and children\'s ministry workers, providing insights on how to train up a child in the way they should go. It covers topics like discipline, spiritual instruction, and creating a nurturing home environment.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3',
        target_department: 'Children',
        series: 'Family Life'
    },
    {
        id: 'sermon-4',
        title: 'Purpose and Identity in Christ',
        preacher: 'Youth Pastor',
        date: '2023-10-05',
        content: 'Aimed at teenagers and young adults, this sermon addresses the search for identity and purpose. It explores how our true identity is found in Christ, as described in Ephesians 2:10, and how God has a unique purpose for every young person. It tackles issues of peer pressure, social media, and finding direction in life.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3',
        target_department: 'Youth',
        series: 'Impact Academy'
    },
    {
        id: 'sermon-5',
        title: 'The Unshakeable Kingdom',
        preacher: 'W.F. Kumuyi',
        date: '2023-10-01',
        content: 'Exploring the eternal nature of God\'s kingdom as described in the book of Hebrews. This message fortifies believers to stand firm in a world of constant change.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3',
        target_department: 'General',
        series: 'GCK Global'
    },
    {
        id: 'sermon-6',
        title: 'Living a Sanctified Life',
        preacher: 'W.F. Kumuyi',
        date: '2023-09-24',
        content: 'A deep dive into the doctrine of sanctification and holiness, explaining the possibility and provision for a life free from sin for every believer.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3',
        target_department: 'Adult',
        series: 'Faith Series'
    },
     {
        id: 'sermon-7',
        title: 'The Heart of a True Worshipper',
        preacher: 'W.F. Kumuyi',
        date: '2023-09-17',
        content: 'This message examines the qualities God looks for in a true worshipper, going beyond music and rituals to the attitude of the heart.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3',
        target_department: 'General',
        series: 'Faith Series'
    },
    {
        id: 'sermon-8',
        title: 'Mentoring the Next Generation',
        preacher: 'Youth Pastor',
        date: '2023-09-10',
        content: 'An essential guide for youth leaders and parents on how to effectively mentor and guide young people in their spiritual walk.',
        audio_path: 'https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3',
        target_department: 'Youth',
        series: 'Impact Academy'
    }
];

// FIX: Added mockFinancials data to resolve import error in Financials.tsx.
export const mockFinancials: FinancialRecord[] = [
    { id: 'fin-1', date: '2023-10-22', member: 'David Member', type: 'Tithe', amount: 25000, transactionId: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz' },
    { id: 'fin-2', date: '2023-10-22', member: 'Grace Leader', type: 'Offering', amount: 10000, transactionId: '0x123abc456def789ghi012jkl345mno678pqr901stu234vwx567' },
    { id: 'fin-3', date: '2023-10-20', member: 'Patience Money', type: 'Building Fund', amount: 50000, transactionId: '0x456def789ghi012jkl345mno678pqr901stu234vwx567yz890' },
];

// FIX: Added mockLocations data to resolve import error in Directory.tsx.
export const mockLocations: Location[] = [
    { id: 'loc-1', name: 'DCLM Gbagada HQ', address: 'Gbagada Expressway, Lagos, Nigeria', pastor: 'W.F. Kumuyi' },
    { id: 'loc-2', name: 'DCLM Abuja National HQ', address: 'Kado District, Abuja, Nigeria', pastor: 'State Overseer' },
    { id: 'loc-3', name: 'DCLM Port Harcourt', address: 'Rumuodara, Port Harcourt, Nigeria', pastor: 'State Overseer' },
];

// FIX: Added mockGCKEventInfo to be used in Live and GCK pages.
export const mockGCKEventInfo: GCKEvent = {
  title: "GCK Global Crusade",
  theme: "Emmanuel: God With Us",
  minister: "Pastor W.F. Kumuyi",
  date: "November 23-28, 2023",
  isLive: true,
  streamUrl: "https://www.youtube.com/dclmhq",
  posterUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
};

// --- Children's Ministry Data ---
export const bibleStories: BibleStory[] = [
    // Old Testament
    { id: 'story1', title: 'The Beginning', description: 'How God created the world.', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', progress: 100, color: 'blue' },
    { id: 'story2', title: 'Adam and Eve', description: 'The first man and woman.', imageUrl: 'https://images.unsplash.com/photo-1587599824888-2d80b72a4c3e?q=80&w=800&auto=format&fit=crop', progress: 90, color: 'green' },
    { id: 'story3', title: 'Cain and Abel', description: 'The first brothers.', imageUrl: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=800&auto=format&fit=crop', progress: 85, color: 'red' },
    { id: 'story4', title: 'Noah\'s Big Boat', description: 'A great flood and a floating zoo.', imageUrl: 'https://images.unsplash.com/photo-1593225241950-1ec65236686e?q=80&w=800&auto=format&fit=crop', progress: 75, color: 'green' },
    { id: 'story5', title: 'The Tower of Babel', description: 'A tall tower and confused languages.', imageUrl: 'https://images.unsplash.com/photo-1614088463499-3f0459546740?q=80&w=800&auto=format&fit=crop', progress: 70, color: 'purple' },
    { id: 'story6', title: 'God\'s Promise to Abraham', description: 'The father of a great nation.', imageUrl: 'https://images.unsplash.com/photo-1506452292316-262a3f3a76c9?q=80&w=800&auto=format&fit=crop', progress: 65, color: 'yellow' },
    { id: 'story7', title: 'Joseph\'s Colorful Coat', description: 'A story of jealousy and forgiveness.', imageUrl: 'https://images.unsplash.com/photo-1621288924152-326e090c2423?q=80&w=800&auto=format&fit=crop', progress: 60, color: 'orange' },
    { id: 'story8', title: 'Baby Moses', description: 'A baby in a basket in the river.', imageUrl: 'https://images.unsplash.com/photo-1569992083311-a5a3a2d3d3a7?q=80&w=800&auto=format&fit=crop', progress: 55, color: 'cyan' },
    { id: 'story9', title: 'The Burning Bush', description: 'God speaks to Moses from a fire.', imageUrl: 'https://images.unsplash.com/photo-1632857069677-248d8a7d8a6e?q=80&w=800&auto=format&fit=crop', progress: 50, color: 'red' },
    { id: 'story10', title: 'The Ten Plagues', description: 'Frogs, flies, and darkness in Egypt.', imageUrl: 'https://images.unsplash.com/photo-1596761099630-f7a461b4a0f1?q=80&w=800&auto=format&fit=crop', progress: 45, color: 'green' },
    { id: 'story11', title: 'Crossing the Red Sea', description: 'God makes a dry path in the water.', imageUrl: 'https://images.unsplash.com/photo-1606259028916-29a5ac79c23a?q=80&w=800&auto=format&fit=crop', progress: 40, color: 'blue' },
    { id: 'story12', title: 'The Ten Commandments', description: 'God\'s rules for His people.', imageUrl: 'https://images.unsplash.com/photo-1554483733-db065ce83711?q=80&w=800&auto=format&fit=crop', progress: 35, color: 'yellow' },
    { id: 'story13', title: 'The Walls of Jericho', description: 'Shouting and trumpets make walls fall.', imageUrl: 'https://images.unsplash.com/photo-1588894483325-f18c89b7b399?q=80&w=800&auto=format&fit=crop', progress: 30, color: 'orange' },
    { id: 'story14', title: 'Samson the Strong', description: 'A strong man with very long hair.', imageUrl: 'https://images.unsplash.com/photo-1596728343552-09c313a52e1f?q=80&w=800&auto=format&fit=crop', progress: 25, color: 'purple' },
    { id: 'story15', title: 'Ruth and Naomi', description: 'A story of great friendship.', imageUrl: 'https://images.unsplash.com/photo-1519482816300-14902c235b69?q=80&w=800&auto=format&fit=crop', progress: 22, color: 'pink' },
    { id: 'story16', title: 'David the Shepherd Boy', description: 'The young boy chosen to be king.', imageUrl: 'https://images.unsplash.com/photo-1511216348163-a2673d3a0885?q=80&w=800&auto=format&fit=crop', progress: 21, color: 'cyan' },
    { id: 'story17', title: 'David the Giant Slayer', description: 'A small boy with a big faith.', imageUrl: 'https://images.unsplash.com/photo-1588665306994-5555c6c8e9e1?q=80&w=800&auto=format&fit=crop', progress: 20, color: 'red' },
    { id: 'story18', title: 'King Solomon\'s Wisdom', description: 'The wisest king of all.', imageUrl: 'https://images.unsplash.com/photo-1604544738743-a6042b083b74?q=80&w=800&auto=format&fit=crop', progress: 18, color: 'yellow' },
    { id: 'story19', title: 'Elijah on Mount Carmel', description: 'God sends fire from heaven.', imageUrl: 'https://images.unsplash.com/photo-1593699313175-18f1a89de87b?q=80&w=800&auto=format&fit=crop', progress: 15, color: 'orange' },
    { id: 'story20', title: 'Daniel in the Lions\' Den', description: 'A brave man who trusted God.', imageUrl: 'https://images.unsplash.com/photo-1603229765275-e87f735e8082?q=80&w=800&auto=format&fit=crop', progress: 10, color: 'purple' },
    { id: 'story21', title: 'Jonah and the Big Fish', description: 'A prophet who ran from God.', imageUrl: 'https://images.unsplash.com/photo-1607923485323-112091b6ab5d?q=80&w=800&auto=format&fit=crop', progress: 5, color: 'cyan' },
    
    // New Testament
    { id: 'story22', title: 'The First Christmas', description: 'The story of Jesus\' birth.', imageUrl: 'https://images.unsplash.com/photo-1575468139744-486a455de39d?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'yellow' },
    { id: 'story23', title: 'John the Baptist', description: 'Preparing the way for Jesus.', imageUrl: 'https://images.unsplash.com/photo-1598289417931-b84439121c83?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'green' },
    { id: 'story24', title: 'Jesus is Baptized', description: 'The start of Jesus\' ministry.', imageUrl: 'https://images.unsplash.com/photo-1529069818210-53c8e42f76d6?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'blue' },
    { id: 'story25', title: 'Jesus Heals the Sick', description: 'Miracles of compassion.', imageUrl: 'https://images.unsplash.com/photo-1605185854388-b2a0a2acc2ac?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'pink' },
    { id: 'story26', title: 'The Sermon on the Mount', description: 'Jesus\' most famous teachings.', imageUrl: 'https://images.unsplash.com/photo-1491841550275-5337b545f51f?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'orange' },
    { id: 'story27', title: 'Jesus Feeds 5,000', description: 'A little lunch for a big crowd.', imageUrl: 'https://images.unsplash.com/photo-1599933734135-2578f142b78a?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'orange' },
    { id: 'story28', title: 'Jesus Walks on Water', description: 'Peter\'s faith is tested.', imageUrl: 'https://images.unsplash.com/photo-1533232195793-87178c18a22a?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'blue' },
    { id: 'story29', title: 'The Good Samaritan', description: 'Loving your neighbor.', imageUrl: 'https://images.unsplash.com/photo-1576788383569-d587a840e74c?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'green' },
    { id: 'story30', title: 'The Prodigal Son', description: 'A father\'s unconditional love.', imageUrl: 'https://images.unsplash.com/photo-1567645854317-a8e5762a0487?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'purple' },
    { id: 'story31', title: 'The Triumphal Entry', description: 'Jesus rides into Jerusalem.', imageUrl: 'https://images.unsplash.com/photo-1586923485459-a4a0a5823126?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'yellow' },
    { id: 'story32', title: 'The Last Supper', description: 'Jesus\' final meal.', imageUrl: 'https://images.unsplash.com/photo-1505692079862-95f74a11c473?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'red' },
    { id: 'story33', title: 'The Crucifixion', description: 'Jesus dies on the cross.', imageUrl: 'https://images.unsplash.com/photo-1594228949822-262f0f4a413d?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'red' },
    { id: 'story34', title: 'The Resurrection', description: 'Jesus is alive!', imageUrl: 'https://images.unsplash.com/photo-1585258995393-78a74e57e323?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'yellow' },
    { id: 'story35', title: 'The Great Commission', description: 'Go and tell the world.', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'blue' },
    { id: 'story36', title: 'Pentecost', description: 'The Holy Spirit comes.', imageUrl: 'https://images.unsplash.com/photo-1594991954316-342085799981?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'orange' },
    { id: 'story37', title: 'Paul\'s Conversion', description: 'From hater to preacher.', imageUrl: 'https://images.unsplash.com/photo-1508921319324-0026e6d3c038?q=80&w=800&auto=format&fit=crop', progress: 0, color: 'purple' },
];

export const bibleHeroes: BibleHero[] = [
    { id: 'hero1', name: 'Noah', description: 'Built a giant ark to save his family and the animals.', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=noah' },
    { id: 'hero2', name: 'Moses', description: 'Led God\'s people out of Egypt and received the Ten Commandments.', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=moses' },
    { id: 'hero3', name: 'David', description: 'A shepherd boy who became a great king and defeated Goliath.', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=davidhero' },
    { id: 'hero4', name: 'Esther', description: 'A brave queen who saved her people from a wicked plan.', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=esther' },
    { id: 'hero5', name: 'Paul', description: 'A missionary who traveled the world to tell people about Jesus.', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=paul' },
];

export const dailyQuests: BibleQuest[] = [
    { id: 'quest1', title: 'Complete a Story', description: 'Read or listen to one full Bible Adventure.', isCompleted: true, icon: BookOpen },
    { id: 'quest2', title: 'Learn a Memory Verse', description: 'Grow your garden by learning a new verse.', isCompleted: false, icon: Star },
    { id: 'quest3', title: 'Meet a Bible Hero', description: 'Find out about one of God\'s faithful servants.', isCompleted: false, icon: UserCheck },
    { id: 'quest4', title: 'Daily Check-in', description: 'Come back tomorrow for new quests!', isCompleted: true, icon: CheckSquare },
];

export const bibleVideos: BibleVideo[] = [
    { id: 'vid1', title: 'The Story of Creation', thumbnailUrl: 'https://img.youtube.com/vi/i2l4G-k_bYw/mqdefault.jpg', duration: '5:12', category: 'Story' },
    { id: 'vid2', title: 'Jesus Loves Me', thumbnailUrl: 'https://img.youtube.com/vi/C3xJ3_6-c_I/mqdefault.jpg', duration: '2:30', category: 'Song' },
    { id: 'vid3', title: 'David and Goliath', thumbnailUrl: 'https://img.youtube.com/vi/i2l4G-k_bYw/mqdefault.jpg', duration: '6:45', category: 'Story' },
    { id: 'vid4', title: 'He\'s Got the Whole World In His Hands', thumbnailUrl: 'https://img.youtube.com/vi/C3xJ3_6-c_I/mqdefault.jpg', duration: '3:05', category: 'Song' },
    { id: 'vid5', title: 'Daniel in the Lion\'s Den', thumbnailUrl: 'https://img.youtube.com/vi/grVp2s7wfe0/mqdefault.jpg', duration: '7:01', category: 'Story' },
    { id: 'vid6', title: 'My God is So Big', thumbnailUrl: 'https://img.youtube.com/vi/C3xJ3_6-c_I/mqdefault.jpg', duration: '2:55', category: 'Song' },
];

export const bibleQuizzes: Quiz[] = [
    {
        id: 'quiz1',
        title: 'Who Am I? Bible Quiz',
        badgeIdToUnlock: 'b3',
        questions: [
            { id: 'q1', question: 'I built a giant ark to save the animals from a flood. Who am I?', options: ['Moses', 'Noah', 'Abraham', 'Adam'], correctAnswer: 'Noah' },
            { id: 'q2', question: 'I was a shepherd boy who defeated a giant with a slingshot. Who am I?', options: ['Joseph', 'Gideon', 'David', 'Samson'], correctAnswer: 'David' },
            { id: 'q3', question: 'God gave me 10 commandments on a mountain. Who am I?', options: ['Moses', 'Joshua', 'Aaron', 'Elijah'], correctAnswer: 'Moses' },
            { id: 'q4', question: 'I was swallowed by a great fish when I ran from God. Who am I?', options: ['Jonah', 'Peter', 'Paul', 'John'], correctAnswer: 'Jonah' },
            { id: 'q5', question: 'I was a brave queen who saved my people. Who am I?', options: ['Ruth', 'Mary', 'Esther', 'Deborah'], correctAnswer: 'Esther' },
        ]
    }
];

export const mockCodingQuests: CodingQuest[] = [
    {
        id: 'cq1',
        title: 'The First Journey',
        description: 'Guide the Lion to Noah\'s Ark. Drag the "Move Left" blocks into the program area to create a path.',
        bibleStory: 'Noah\'s Ark (Sequencing)',
        gridSize: 5,
        initialGrid: [
            { id: 'player1', type: 'player', x: 4, y: 2, icon: '🦁' },
            { id: 'target1', type: 'target', x: 0, y: 2, icon: Ship },
        ],
        availableBlocks: [
            { id: 'move-left', label: 'Move Left', type: 'move', direction: 'left', icon: MoveLeft },
        ],
        solution: ['move-left', 'move-left', 'move-left', 'move-left'],
        isCompleted: true, // Start with the first one completed to show progress
        badgeIdToUnlock: 'b7',
    },
    {
        id: 'cq2',
        title: 'Marching Two by Two',
        description: 'The path is long! Use a "Repeat" block to move the sheep to the ark more quickly.',
        bibleStory: 'Noah\'s Ark (Loops)',
        gridSize: 5,
        initialGrid: [
            { id: 'player1', type: 'player', x: 4, y: 2, icon: '🐑' },
            { id: 'target1', type: 'target', x: 0, y: 2, icon: Ship },
        ],
        availableBlocks: [
            { id: 'move-left', label: 'Move Left', type: 'move', direction: 'left', icon: MoveLeft },
            { id: 'loop-4', label: 'Repeat 4 times', type: 'loop_start', times: 4, icon: Repeat },
        ],
        solution: ['loop-4', 'move-left'], // Simplified solution logic for this mock
        isCompleted: false,
        badgeIdToUnlock: 'b8',
    },
     {
        id: 'cq3',
        title: 'Up the Mountain',
        description: 'Moses needs to go up the mountain to receive the commandments. Can you guide him?',
        bibleStory: 'Moses on Mount Sinai (Loops & Sequencing)',
        gridSize: 5,
        initialGrid: [
            { id: 'player1', type: 'player', x: 2, y: 4, icon: '👨🏾' },
            { id: 'target1', type: 'target', x: 2, y: 0, icon: '📜' },
        ],
        availableBlocks: [
            { id: 'move-up', label: 'Move Up', type: 'move', direction: 'up', icon: MoveUp },
            { id: 'loop-4', label: 'Repeat 4 times', type: 'loop_start', times: 4, icon: Repeat },
        ],
        solution: ['loop-4', 'move-up'],
        isCompleted: false,
    },
];