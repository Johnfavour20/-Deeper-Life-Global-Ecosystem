
import React from 'react';

// From App.tsx and navigation components
export type ActiveTab =
  | 'dashboard' | 'live' | 'kumuyi_messages' | 'ghs' | 'bible' | 'sts' | 'daily_manna'
  | 'directory' | 'connect' | 'events' | 'meetings' | 'children' | 'chorister_hub'
  | 'settings' | 'attendance' | 'financials' | 'users' | 'analytics' | 'blockchain';

// Type for the active view in the Connect component
export type ConnectView = 'home' | 'explore' | 'notifications' | 'bookmarks' | 'profile' | 'messages' | 'prayer_wall' | 'ask_kumuyi' | 'marketplace' | 'blogs' | 'mentorship';


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
  profession?: string;
  location?: string;
  smallGroup?: string;
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

export type MessageSeries =
    | 'GCK Global'
    | 'Impact Academy'
    | 'Ministers Conference'
    | 'Monday Bible Study'
    | 'Thursday Revival Service'
    | 'Sunday Worship Service'
    | 'Special Program'
    | 'Faith Series'
    | 'Family Life';

export interface KumuyiMessage {
    id: string;
    type: 'video' | 'audio';
    title: string;
    series: MessageSeries;
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
export interface SmallGroup {
    id: string;
    name: string;
    leader: string;
    location: string;
    memberCount: number;
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

export interface HymnSetlist {
    id: string;
    title: string;
    date: string;
    hymns: Hymn[];
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

// From Connect page (new features)
export interface PrayerRequest {
    id: string;
    author: string;
    avatar: string;
    request: string;
    timestamp: string;
    prayerCount: number;
    isAnonymous: boolean;
}

export interface MarketplaceItem {
    id: string;
    title: string;
    price: number;
    seller: string;
    imageUrl: string;
    category: 'Books' | 'Music' | 'Apparel' | 'Art' | 'Professional Service';
}

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    authorAvatar: string;
    timestamp: string;
    imageUrl: string;
    snippet: string;
    readTime: number; // in minutes
}

export interface MentorshipProfile {
    userId: string;
    name: string;
    avatar: string;
    role: 'Mentor' | 'Mentee';
    title: string;
    expertise: string[];
    bio: string;
}

// From STS Page
export interface Badge {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    unlocked: boolean;
    criteria: string;
}

// From GCK Page
export interface GCKEvent {
  title: string;
  theme: string;
  minister: string;
  date: string;
  isLive: boolean;
  streamUrl: string;
  posterUrl: string;
}

export interface GCKScheduleItem {
  day: string;
  date: string;
  time: string;
  topic: string;
}

export interface GCKTestimony {
  id: string;
  author: string;
  location: string;
  testimony: string;
  avatar: string;
}

// From Children's Page
export interface BibleStory {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    progress: number; // 0-100
    color: string;
}

export interface BibleHero {
    id: string;
    name: string;
    description: string;
    avatarUrl: string;
}

export interface BibleQuest {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    icon: React.ElementType;
}

export interface BibleVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    duration: string;
    category: 'Song' | 'Story';
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface BibleCharacterProfile {
    name: string;
    summary: string;
    keyFacts: string[];
    verses: {
        reference: string;
        text: string;
    }[];
    imageUrl: string; // base64 string with data URI
}

export interface AvatarConfig {
    hairStyle: number;
    hairColor: string;
    eyeStyle: number;
    mouthStyle: number;
    skinColor: string;
    shirtColor: string;
}

export interface CodeBlock {
    id: string;
    label: string;
    type: 'move' | 'loop_start' | 'loop_end';
    direction?: 'up' | 'down' | 'left' | 'right';
    times?: number;
    icon: React.ElementType;
}

export interface GridObject {
    id: string;
    type: 'player' | 'target' | 'obstacle';
    x: number;
    y: number;
    icon: React.ElementType | string;
}

export interface CodingQuest {
    id: string;
    title: string;
    description: string;
    bibleStory: string;
    gridSize: number;
    initialGrid: GridObject[];
    availableBlocks: CodeBlock[];
    solution: string[];
    isCompleted?: boolean;
    badgeIdToUnlock?: string;
}


export interface YPFEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Webinar' | 'Seminar' | 'Networking' | 'Workshop';
  imageUrl: string;
}

export interface YPFResource {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Podcast';
  author: string;
  duration: string;
  link: string;
  imageUrl: string;
}

export interface Quiz {
    id:string;
    title: string;
    questions: QuizQuestion[];
    badgeIdToUnlock: string;
}
