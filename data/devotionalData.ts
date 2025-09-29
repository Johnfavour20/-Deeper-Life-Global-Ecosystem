import { Devotional } from '../types';

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const dayBefore = new Date(today);
dayBefore.setDate(today.getDate() - 2);


export const devotionalArchive: Devotional[] = [
    {
        date: formatDate(today),
        title: "HE IS MINDFUL OF YOU",
        keyVerse: '"What is man, that thou art mindful of him? and the son of man, that thou visitest him?" (Psalm 8:4).',
        passage: "Psalm 8:1-9",
        content: [
            "A songwriter wrote, 'I sing because I'm happy, I sing because I'm free, For His eye is on the sparrow, and I know He watches me'. This indeed, is the summary of the liberties and privileges every believer enjoys in Christ. God is not just a Creator who abandoned His creation to their fate. He is a loving Father who is mindful of and interested in every detail of the lives of His children.",
            "David, in our text, reflected on the majesty and glory of God. He looked at the heavens, the moon, and the stars which God had ordained and concluded that they were all beautiful and glorious. But his greatest wonder was that this great God is mindful of man. This is the same thought that should fill the heart of every believer daily.",
            "God's mindfulness of us, His children, covers all areas of our lives. He is mindful of our spiritual, physical, material and financial well-being. He makes provision for our protection from the evil one. He is always there to lift us up when we are down. He fights our battles and gives us victory always. He answers our prayers and forgives our sins. He comforts and strengthens us in moments of trial and temptation. He guides us in the path of righteousness and finally, has gone to prepare a place for us in heaven.",
            "No matter what you may be passing through today, do not be discouraged. Don't think that God has forgotten you. He is mindful of you. The challenge you are facing is not strange. He is aware of it and will surely see you through. Just hold on to His promises. He who has promised to be with you always, even to the end of the world, will not abandon you."
        ],
        thought: "He who remembers the sparrow will not forget His saints.",
        audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3"
    },
    {
        date: formatDate(yesterday),
        title: "THE POWER OF A PURE HEART",
        keyVerse: '"Blessed are the pure in heart: for they shall see God." (Matthew 5:8).',
        passage: "Psalm 24:1-6",
        content: [
            "Purity of heart is not merely an outward observance of rules, but an inward state of being, where our motives, desires, and thoughts are aligned with God's will. It is a heart that is free from deceit, malice, and selfish ambition. King David understood this deeply when he asked, 'Who shall ascend into the hill of the LORD? or who shall stand in his holy place? He that hath clean hands, and a pure heart' (Psalm 24:3-4).",
            "A pure heart is the prerequisite for true fellowship with God. It allows us to 'see' Him—not with our physical eyes, but with the eyes of our spirit. We perceive His presence, understand His ways, and experience His power in our lives. When our hearts are cluttered with the impurities of the world, our spiritual vision becomes blurred.",
            "How do we attain this purity? It is not through self-effort alone, but through the cleansing power of Christ's blood and the sanctifying work of the Holy Spirit. We must daily surrender our hearts to God, allowing Him to search us, know us, and cleanse us from all unrighteousness. As we do, we will find our capacity to love, serve, and worship Him grows exponentially.",
            "Let us make it our daily pursuit to cultivate a pure heart before the Lord. Let go of grudges, confess hidden sins, and fill your mind with that which is true, noble, and pure. In doing so, you will unlock a deeper, more intimate relationship with your Creator and be a vessel fit for the Master's use."
        ],
        thought: "A pure heart is the clearest window through which we can see God.",
        audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3"
    },
    {
        date: formatDate(dayBefore),
        title: "STANDING ON THE PROMISES",
        keyVerse: '"For all the promises of God in him are yea, and in him Amen, unto the glory of God by us." (2 Corinthians 1:20).',
        passage: "Hebrews 10:19-23",
        content: [
            "The Christian faith is built upon the solid foundation of God's promises. These are not mere wishes or hopeful platitudes; they are divine declarations backed by the character and power of Almighty God. From Genesis to Revelation, the Bible is filled with thousands of promises covering every aspect of our lives - forgiveness, provision, guidance, strength, and eternal life.",
            "Our text encourages us to 'hold fast the profession of our faith without wavering; (for he is faithful that promised)'. In a world of uncertainty and constant change, God's promises are our anchor. They remain steadfast and sure, regardless of our circumstances, feelings, or the passing of time.",
            "However, these promises are not automatically fulfilled in our lives. They must be claimed by faith. Faith is the hand that reaches out and takes hold of what God has already provided. It is choosing to believe God's Word over the evidence of our senses or the doubts in our minds. When we stand on the promises, we are shifting our focus from the problem to the Problem-Solver.",
            "Are you facing a challenge today? Find a promise in God's Word that speaks to your situation. Meditate on it, confess it, and act on it. Do not be swayed by doubt or delay. Trust that the One who made the promise is faithful to perform it. As you learn to live a promise-centered life, you will experience a new level of victory, peace, and confidence in your walk with God."
        ],
        thought: "God's promises are the Christian's title-deeds to the inheritance of grace.",
        audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3"
    }
];