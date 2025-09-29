// FIX: Imported missing types to support new mock data for Sermons, Financials, and Directory pages.
import { User, AttendanceRecord, PaymentRecord, Project, AccountDetail, Sermon, FinancialRecord, Location, MinistryDepartment } from '../types';

export const mockUsers: User[] = [
    { id: '1', username: 'reg_admin', password: 'password123', role: 'regional_admin', full_name: 'Dr. John Admin', phone_number: '08012345678', email: 'reg.admin@dclm.org', gender: 'male', department: 'Adult' },
    { id: '2', username: 'grp_admin', role: 'group_admin', full_name: 'Mrs. Grace Leader', phone_number: '08023456789', email: 'grp.admin@dclm.org', gender: 'female', department: 'Children' },
    { id: '3', username: 'usher_user', role: 'usher', full_name: 'Samuel Clerk', phone_number: '08034567890', email: 'sec.user@dclm.org', gender: 'male', department: 'General' },
    { id: '4', username: 'financial_secretary_user', role: 'financial_secretary', full_name: 'Patience Money', phone_number: '08045678901', email: 'acc.user@dclm.org', gender: 'female', department: 'General' },
    { id: '5', username: 'member1', role: 'usher', full_name: 'David Member', phone_number: '08056789012', email: 'member1@dclm.org', gender: 'male', department: 'Youth' },
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