import { GlobalStats, Message, STSLesson } from '../types';

export const globalStats: GlobalStats = {
    totalMembers: '50.2M',
    activeNations: '183',
    liveViewers: '2.4M',
    dailyGHS: '260+',
    stsCompletion: '89%',
    onlineChurches: '45,000+'
};

export const messageData: Message[] = [
    { 
        title: "Emmanuel, Jesus the Majestic God of Glory",
        speaker: "Pastor W.F. Kumuyi",
        date: "Dec 26, 2023",
        duration: "52 min",
        category: "GCK Global",
        isLive: true
    },
    { 
        title: "The Expected Christ",
        speaker: "Pastor W.F. Kumuyi",
        date: "Nov 15, 2023",
        duration: "48 min",
        category: "GCK India"
    },
    { 
        title: "Gracious Emmanuel for Soaring Heavenward Eagles",
        speaker: "Pastor W.F. Kumuyi",
        date: "Dec 26, 2023",
        duration: "45 min",
        category: "Impact Academy"
    },
    { 
        title: "The Exalted Christ", 
        speaker: "Pastor W.F. Kumuyi",
        date: "Nov 14, 2023",
        duration: "55 min",
        category: "GCK India"
    },
    { 
        title: "Watching Over the Priorities",
        speaker: "Pastor W.F. Kumuyi",
        date: "Oct 30, 2023",
        duration: "1h 12min",
        category: "Ministers Conf"
    },
    { 
        title: "Divine Healing and Wholeness",
        speaker: "Pastor W.F. Kumuyi",
        date: "Sep 22, 2023",
        duration: "49 min",
        category: "Medical Outreach"
    }
];

export const stsLessons: STSLesson[] = [
    {
        title: "The Power of Prayer",
        scripture: "James 5:16-18",
        content: "The effectual fervent prayer of a righteous man availeth much. Elias was a man subject to like passions as we are, and he prayed earnestly that it might not rain: and it rained not on the earth by the space of three years and six months. And he prayed again, and the heaven gave rain, and the earth brought forth her fruit. Today's lesson explores the transformative power of righteous prayer, emphasizing how our connection with God can move mountains and bring healing to our communities."
    }
];

export const hymnCategories = [
    { name: "Adoration", count: 35, color: "blue" },
    { name: "Assurance & Confidence", count: 28, color: "green" },
    { name: "Christ Our Saviour", count: 42, color: "purple" },
    { name: "Christian Life", count: 38, color: "orange" },
    { name: "Prayer", count: 25, color: "red" },
    { name: "Heaven", count: 22, color: "indigo" },
    { name: "Holy Spirit", count: 18, color: "pink" },
    { name: "Evangelism", count: 15, color: "teal" }
];

export const popularHymns = [
    { number: "GHS 1", title: "Holy, Holy, Holy", key: "Eb Major", category: "Adoration" },
    { number: "GHS 45", title: "Great is Thy Faithfulness", key: "G Major", category: "Assurance" },
    { number: "GHS 127", title: "Amazing Grace", key: "D Major", category: "Grace" },
    { number: "GHS 89", title: "How Great Thou Art", key: "C Major", category: "Adoration" },
    { number: "GHS 156", title: "Blessed Assurance", key: "F Major", category: "Assurance" },
    { number: "GHS 203", title: "What a Friend We Have in Jesus", key: "Bb Major", category: "Prayer" },
];

export const bibleBooks = [
    "Genesis", "Psalms", "Proverbs", "Isaiah", "Matthew", "John", 
    "Romans", "1 Corinthians", "Ephesians", "Philippians", "1 Timothy", "Revelation"
];

export const readingPlans = [
    { title: "Bible in a Year", duration: "365 days", progress: 78 },
    { title: "New Testament in 90 Days", duration: "90 days", progress: 45 },
    { title: "The Life of Christ", duration: "30 days", progress: 95 },
];

export const commentaries = [
    { name: "Matthew Henry's Commentary", author: "Matthew Henry" },
    { name: "Spurgeon's Treasury of David", author: "Charles Spurgeon" },
    { name: "Scofield Reference Notes", author: "C.I. Scofield" },
];
