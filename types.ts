// From App.tsx and navigation components
export type ActiveTab =
  | 'dashboard' | 'live' | 'kumuyi_messages' | 'ghs' | 'bible' | 'sts' | 'daily_manna'
  | 'directory' | 'connect' | 'events' | 'meetings' | 'analytics'
  | 'blockchain' | 'settings' | 'attendance' | 'financials' | 'users';

// From AuthContext, mockData, etc.
export type UserRole =
  | 'member' | 'usher' | 'financial_secretary' | 'group_pastor'
  | 'group_admin' | 'regional_pastor' | 'regional_admin'
  | 'national_overseer' | 'g_s';

export type MinistryDepartment = 'General' | 'Children' | 'Youth' | 'Young Adults' | 'Adult' | 'Specialized';

export interface User {
  id: string;
  username: string;
  password?: string; // Should not be on frontend, but for mock data...
  role: UserRole;
  full_name: string;
  phone_number: string;
  email: string;
  gender: 'male' | 'female';
  department: MinistryDepartment | 'General';
}

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    bio: string;
    profilePictureUrl: string;
    growth: {
      bibleReading: number;
      sermonsWatched: number;
      hymnsLearned: number;
    }
}

// From Attendance page and mockData
export interface AttendanceRecord {
    id: string;
    service_date: string;
    men: number;
    women: number;
    youth_boys: number;
    youth_girls: number;
    children_boys: number;
    children_girls: number;
    new_converts: number;
    youtube: number;
    total_headcount: number;
}

// From Financials/Payments pages and mockData
export interface PaymentRecord {
    id: string;
    date: string;
    payment_type: 'offering' | 'tithe' | 'building_fund' | 'generator_fund' | 'other';
    amount: number;
    description: string;
    account_details: string;
    receipt_path?: string;
}

export interface Project {
    id: string;
    project_name: string;
    target_amount: number;
    current_amount: number;
    start_date: string;
    status: 'active' | 'completed' | 'on_hold';
}

export interface AccountDetail {
    id: string;
    account_type: 'main' | 'project' | 'welfare';
    account_name: string;
    account_number: string;
    bank_name: string;
    sort_code?: string;
}

export interface FinancialRecord {
    id: string;
    date: string;
    member: string;
    type: 'Tithe' | 'Offering' | 'Building Fund';
    amount: number;
    transactionId: string;
}

// From Sermons page and mockData
export interface Sermon {
    id: string;
    title: string;
    preacher: string;
    date: string;
    content: string;
    audio_path?: string;
    target_department: MinistryDepartment | 'General';
    isFeatured?: boolean;
    series?: string;
}

export interface KumuyiMessage {
    id: string;
    type: 'video' | 'audio';
    title: string;
    series: string;
    speaker: string;
    date: string;
    duration: string;
    views: string;
    thumbnailUrl: string;
    videoUrl?: string;
    audioUrl?: string;
    description: string;
    isFeatured?: boolean;
}

// From Directory page and mockData
export interface Location {
    id: string;
    name: string;
    address: string;
    pastor: string;
}

// From Hymns page and data
export interface Hymn {
    id: string;
    number: number;
    title: string;
    category: string;
    key: string;
    sheetMusicUrl: string;
    lyrics: string[];
    audioUrl?: string;
}

export interface HymnRecommendation {
    number: number;
    title: string;
    reason: string;
    category: string;
}

// From Audio context
export interface AudioTrack {
    type: 'radio' | 'hymn' | 'sermon' | 'devotional' | 'message';
    title: string;
    artist: string;
    url: string;
    artwork: string;
}

export interface AudioContextType {
    currentTrack: AudioTrack | null;
    isPlaying: boolean;
    playTrack: (track: AudioTrack) => void;
    togglePlay: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
    progress: number;
    duration: number;
    streamLanguage: string;
    setStreamLanguage: React.Dispatch<React.SetStateAction<string>>;
}

// From Bible page and data
export interface Verse {
    verse: number;
    text: string;
}

export interface Chapter {
    chapter: number;
    verses: Verse[];
    // FIX: Added optional 'audioUrl' to support audio playback for Bible chapters.
    audioUrl?: string;
}

export interface Book {
    book: string;
    chapters: Chapter[];
}

export interface BibleVersion {
    version: string;
    books: Book[];
}

export interface BibleBookmark {
    book: string;
    chapter: number;
    verse: number;
    text: string;
}

export interface BibleHighlight extends BibleBookmark {
    color: string;
}

export interface BibleNote extends BibleBookmark {
    note: string;
}

export interface DailyReading {
  day: number;
  passage: string;
  book: string;
  startChapter: number;
  endChapter: number;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  readings: DailyReading[];
}


// From dashboardData
export interface GlobalStats {
    totalMembers: string;
    activeNations: string;
    liveViewers: string;
    dailyGHS: string;
    stsCompletion: string;
    onlineChurches: string;
}

export interface Message {
    title: string;
    speaker: string;
    date: string;
    duration: string;
    category: string;
    isLive?: boolean;
}

export interface STSLesson {
    title: string;
    scripture: string;
    content: string;
}

// From chatData and messaging pages
export interface Story {
    id: string;
    author: string;
    avatar: string;
    viewed: boolean;
}

export interface ChatMessage {
    id: string;
    from: 'me' | 'them';
    author?: string; // for group chats
    text: string;
    time: string;
    status: 'sent' | 'delivered' | 'read';
    type?: 'text' | 'image' | 'audio';
    content?: string; // URL for image/audio
    replyCount?: number;
    threadId?: string;
    parentId?: string;
    reactions?: { [key: string]: number };
}

export interface CallLog {
    id: string;
    contactName: string;
    avatar: string;
    type: 'voice' | 'video';
    direction: 'incoming' | 'outgoing' | 'missed';
    time: string;
}

export interface CommunityInfo {
    id: string;
    name: string;
    avatar: string;
    description: string;
}

export interface Channel {
    id: string;
    name: string;
    avatar: string;
    lastUpdate: string;
    muted: boolean;
}

// From Community/Connect page
export interface CommunityPost {
    id: number;
    author: string;
    avatar: string;
    time: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
    category: 'Testimonies' | 'Prayer Requests' | 'Announcements' | 'Discussion';
    imageUrl?: string;
    poll?: {
        question: string;
        options: { id: string; text: string; votes: number }[];
    };
    quote?: {
        author: string;
        avatar: string;
        time: string;
        content: string;
    };
    threadId?: string;
    isThreadStart?: boolean;
}

// From devotionalData
export interface Devotional {
    date: string;
    title: string;
    keyVerse: string;
    passage: string;
    content: string[];
    thought: string;
    audioUrl?: string;
}

// From notificationData
export interface Notification {
    id: string;
    type: 'sermon' | 'prayer' | 'announcement' | 'event';
    title: string;
    description: string;
    time: string;
    read: boolean;
}