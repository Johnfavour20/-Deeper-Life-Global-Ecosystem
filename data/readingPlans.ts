import { ReadingPlan } from '../types';

export const readingPlansData: ReadingPlan[] = [
    {
        id: 'nt-90',
        title: 'New Testament in 90 Days',
        description: 'Read through the entire New Testament from Matthew to Revelation in just three months.',
        duration: 90,
        readings: [
            { day: 1, passage: 'Matthew 1-3', book: 'Matthew', startChapter: 1, endChapter: 3 },
            { day: 2, passage: 'Matthew 4-6', book: 'Matthew', startChapter: 4, endChapter: 6 },
            { day: 3, passage: 'Matthew 7-9', book: 'Matthew', startChapter: 7, endChapter: 9 },
            // In a real app, all 90 days would be listed.
             { day: 89, passage: 'Revelation 18-20', book: 'Revelation', startChapter: 18, endChapter: 20 },
             { day: 90, passage: 'Revelation 21-22', book: 'Revelation', startChapter: 21, endChapter: 22 },
        ]
    },
    {
        id: 'proverbs-daily',
        title: 'Proverbs Daily',
        description: 'Gain wisdom by reading one chapter from the book of Proverbs each day for a month.',
        duration: 31,
        readings: Array.from({ length: 31 }, (_, i) => ({
            day: i + 1,
            passage: `Proverbs ${i + 1}`,
            book: 'Proverbs',
            startChapter: i + 1,
            endChapter: i + 1,
        }))
    },
    {
        id: 'life-of-christ',
        title: 'The Life of Christ',
        description: 'A 40-day journey through the Gospels, exploring the life and ministry of Jesus Christ.',
        duration: 40,
        readings: [
            { day: 1, passage: 'John 1', book: 'John', startChapter: 1, endChapter: 1 },
            { day: 2, passage: 'Luke 1', book: 'Luke', startChapter: 1, endChapter: 1 },
            { day: 3, passage: 'Matthew 1-2', book: 'Matthew', startChapter: 1, endChapter: 2 },
            // In a real app, all 40 days would be listed.
        ]
    }
];
