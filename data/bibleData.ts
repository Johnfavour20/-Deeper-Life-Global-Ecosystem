import { BibleVersion } from '../types';

export const bibleData: BibleVersion[] = [
    {
        version: "KJV",
        books: [
            // Old Testament
            {
                book: "Genesis",
                chapters: [
                    {
                        chapter: 1,
                        audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3",
                        verses: [
                            { verse: 1, text: "In the beginning God created the heaven and the earth." },
                            { verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
                            { verse: 3, text: "And God said, Let there be light: and there was light." },
                            { verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
                            { verse: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
                            { verse: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
                            { verse: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." },
                            { verse: 8, text: "And God called the firmament Heaven. And the evening and the morning were the second day." },
                            { verse: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so." },
                            { verse: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good." },
                            { verse: 11, text: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so." },
                            { verse: 12, text: "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good." },
                            { verse: 13, text: "And the evening and the morning were the third day." },
                            { verse: 14, text: "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:" },
                            { verse: 15, text: "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so." },
                            { verse: 16, text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also." },
                            { verse: 17, text: "And God set them in the firmament of the heaven to give light upon the earth," },
                            { verse: 18, text: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good." },
                            { verse: 19, text: "And the evening and the morning were the fourth day." },
                            { verse: 20, text: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven." },
                            { verse: 21, text: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good." },
                            { verse: 22, text: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth." },
                            { verse: 23, text: "And the evening and the morning were the fifth day." },
                            { verse: 24, text: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so." },
                            { verse: 25, text: "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good." },
                            { verse: 26, text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth." },
                            { verse: 27, text: "So God created man in his own image, in the image of God created he him; male and female created he them." },
                            { verse: 28, text: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth." },
                            { verse: 29, text: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat." },
                            { verse: 30, text: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so." },
                            { verse: 31, text: "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day." }
                        ]
                    }
                ]
            },
            {
                book: "Exodus",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [
                    { verse: 1, text: "Now these are the names of the children of Israel, which came into Egypt; every man and his household came with Jacob." },
                    { verse: 2, text: "Reuben, Simeon, Levi, and Judah," },
                    { verse: 3, text: "Issachar, Zebulun, and Benjamin," },
                    { verse: 4, text: "Dan, and Naphtali, Gad, and Asher." },
                    { verse: 5, text: "And all the souls that came out of the loins of Jacob were seventy souls: for Joseph was in Egypt already." },
                    { verse: 6, text: "And Joseph died, and all his brethren, and all that generation." },
                    { verse: 7, text: "And the children of Israel were fruitful, and increased abundantly, and multiplied, and waxed exceeding mighty; and the land was filled with them." },
                    { verse: 8, text: "Now there arose up a new king over Egypt, which knew not Joseph." },
                    { verse: 9, text: "And he said unto his people, Behold, the people of the children of Israel are more and mightier than we:" },
                    { verse: 10, text: "Come on, let us deal wisely with them; lest they multiply, and it come to pass, that, when there falleth out any war, they join also unto our enemies, and fight against us, and so get them up out of the land." },
                    { verse: 11, text: "Therefore they did set over them taskmasters to afflict them with their burdens. And they built for Pharaoh treasure cities, Pithom and Raamses." },
                    { verse: 12, text: "But the more they afflicted them, the more they multiplied and grew. And they were grieved because of the children of Israel." },
                    { verse: 13, text: "And the Egyptians made the children of Israel to serve with rigour:" },
                    { verse: 14, text: "And they made their lives bitter with hard bondage, in morter, and in brick, and in all manner of service in the field: all their service, wherein they made them serve, was with rigour." },
                    { verse: 15, text: "And the king of Egypt spake to the Hebrew midwives, of which the name of the one was Shiphrah, and the name of the other Puah:" },
                    { verse: 16, text: "And he said, When ye do the office of a midwife to the Hebrew women, and see them upon the stools; if it be a son, then ye shall kill him: but if it be a daughter, then she shall live." },
                    { verse: 17, text: "But the midwives feared God, and did not as the king of Egypt commanded them, but saved the men children alive." },
                    { verse: 18, text: "And the king of Egypt called for the midwives, and said unto them, Why have ye done this thing, and have saved the men children alive?" },
                    { verse: 19, text: "And the midwives said unto Pharaoh, Because the Hebrew women are not as the Egyptian women; for they are lively, and are delivered ere the midwives come in unto them." },
                    { verse: 20, text: "Therefore God dealt well with the midwives: and the people multiplied, and waxed very mighty." },
                    { verse: 21, text: "And it came to pass, because the midwives feared God, that he made them houses." },
                    { verse: 22, text: "And Pharaoh charged all his people, saying, Every son that is born ye shall cast into the river, and every daughter ye shall save alive." },
                ]}]
            },
            {
                book: "Leviticus",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [
                    { verse: 1, text: "And the LORD called unto Moses, and spake unto him out of the tabernacle of the congregation, saying," },
                    { verse: 2, text: "Speak unto the children of Israel, and say unto them, If any man of you bring an offering unto the LORD, ye shall bring your offering of the cattle, even of the herd, and of the flock." },
                ]}]
            },
            {
                book: "Numbers",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [
                    { verse: 1, text: "And the LORD spake unto Moses in the wilderness of Sinai, in the tabernacle of the congregation, on the first day of the second month, in the second year after they were come out of the land of Egypt, saying," },
                ]}]
            },
            {
                book: "Deuteronomy",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [
                    { verse: 1, text: "These be the words which Moses spake unto all Israel on this side Jordan in the wilderness, in the plain over against the Red sea, between Paran, and Tophel, and Laban, and Hazeroth, and Dizahab." },
                ]}]
            },
            {
                book: "Joshua",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [
                    { verse: 1, text: "Now after the death of Moses the servant of the LORD it came to pass, that the LORD spake unto Joshua the son of Nun, Moses' minister, saying," },
                    { verse: 9, text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
                ]}]
            },
            { book: "Judges", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Now after the death of Joshua it came to pass, that the children of Israel asked the LORD, saying, Who shall go up for us against the Canaanites first, to fight against them?" }] }] },
            { book: "Ruth", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Now it came to pass in the days when the judges ruled, that there was a famine in the land. And a certain man of Bethlehemjudah went to sojourn in the country of Moab, he, and his wife, and his two sons." }] }] },
            { book: "1 Samuel", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Now there was a certain man of Ramathaimzophim, of mount Ephraim, and his name was Elkanah, the son of Jeroham, the son of Elihu, the son of Tohu, the son of Zuph, an Ephrathite:" }] }] },
            { book: "2 Samuel", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Now it came to pass after the death of Saul, when David was returned from the slaughter of the Amalekites, and David had abode two days in Ziklag;" }] }] },
            { book: "1 Kings", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Now king David was old and stricken in years; and they covered him with clothes, but he gat no heat." }] }] },
            { book: "2 Kings", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Then Moab rebelled against Israel after the death of Ahab." }] }] },
            { book: "1 Chronicles", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Adam, Sheth, Enosh," }] }] },
            { book: "2 Chronicles", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "And Solomon the son of David was strengthened in his kingdom, and the LORD his God was with him, and magnified him exceedingly." }] }] },
            { book: "Ezra", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Now in the first year of Cyrus king of Persia, that the word of the LORD by the mouth of Jeremiah might be fulfilled, the LORD stirred up the spirit of Cyrus king of Persia, that he made a proclamation throughout all his kingdom, and put it also in writing, saying," }] }] },
            { book: "Nehemiah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "The words of Nehemiah the son of Hachaliah. And it came to pass in the month Chisleu, in the twentieth year, as I was in Shushan the palace," }] }] },
            { book: "Esther", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Now it came to pass in the days of Ahasuerus, (this is Ahasuerus which reigned, from India even unto Ethiopia, over an hundred and seven and twenty provinces:)" }] }] },
            {
                book: "Job",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [
                    { verse: 1, text: "There was a man in the land of Uz, whose name was Job; and that man was perfect and upright, and one that feared God, and eschewed evil." },
                ]}]
            },
            {
                book: "Psalms",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [
                    { verse: 1, text: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful." },
                ]}]
            },
            { book: "Proverbs", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "The proverbs of Solomon the son of David, king of Israel;" }] }] },
            { book: "Ecclesiastes", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "The words of the Preacher, the son of David, king in Jerusalem." }] }] },
            { book: "Song of Solomon", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "The song of songs, which is Solomon's." }] }] },
            { book: "Isaiah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "The vision of Isaiah the son of Amoz, which he saw concerning Judah and Jerusalem in the days of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah." }] }] },
            { book: "Jeremiah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "The words of Jeremiah the son of Hilkiah, of the priests that were in Anathoth in the land of Benjamin:" }] }] },
            { book: "Lamentations", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary!" }] }] },
            { book: "Ezekiel", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Now it came to pass in the thirtieth year, in the fourth month, in the fifth day of the month, as I was among the captives by the river of Chebar, that the heavens were opened, and I saw visions of God." }] }] },
            { book: "Daniel", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "In the third year of the reign of Jehoiakim king of Judah came Nebuchadnezzar king of Babylon unto Jerusalem, and besieged it." }] }] },
            { book: "Hosea", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "The word of the LORD that came unto Hosea, the son of Beeri, in the days of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah, and in the days of Jeroboam the son of Joash, king of Israel." }] }] },
            { book: "Joel", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "The word of the LORD that came to Joel the son of Pethuel." }] }] },
            { book: "Amos", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "The words of Amos, who was among the herdmen of Tekoa, which he saw concerning Israel in the days of Uzziah king of Judah, and in the days of Jeroboam the son of Joash king of Israel, two years before the earthquake." }] }] },
            { book: "Obadiah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "The vision of Obadiah. Thus saith the Lord GOD concerning Edom; We have heard a rumour from the LORD, and an ambassador is sent among the heathen, Arise ye, and let us rise up against her in battle." }] }] },
            { book: "Jonah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Now the word of the LORD came unto Jonah the son of Amittai, saying," }] }] },
            { book: "Micah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "The word of the LORD that came to Micah the Morasthite in the days of Jotham, Ahaz, and Hezekiah, kings of Judah, which he saw concerning Samaria and Jerusalem." }] }] },
            { book: "Nahum", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "The burden of Nineveh. The book of the vision of Nahum the Elkoshite." }] }] },
            { book: "Habakkuk", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "The burden which Habakkuk the prophet did see." }] }] },
            { book: "Zephaniah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "The word of the LORD which came unto Zephaniah the son of Cushi, the son of Gedaliah, the son of Amariah, the son of Hizkiah, in the days of Josiah the son of Amon, king of Judah." }] }] },
            { book: "Haggai", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "In the second year of Darius the king, in the sixth month, in the first day of the month, came the word of the LORD by Haggai the prophet unto Zerubbabel the son of Shealtiel, governor of Judah, and to Joshua the son of Josedech, the high priest, saying," }] }] },
            { book: "Zechariah", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "In the eighth month, in the second year of Darius, came the word of the LORD unto Zechariah, the son of Berechiah, the son of Iddo the prophet, saying," }] }] },
            { book: "Malachi", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "The burden of the word of the LORD to Israel by Malachi." }] }] },
            // New Testament
            {
                book: "Matthew",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [
                    { verse: 1, text: "The book of the generation of Jesus Christ, the son of David, the son of Abraham." },
                ]}]
            },
            { book: "Mark", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "The beginning of the gospel of Jesus Christ, the Son of God;" }] }] },
            { book: "Luke", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Forasmuch as many have taken in hand to set forth in order a declaration of those things which are most surely believed among us," }] }] },
            {
                book: "John",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [
                    { verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
                    { verse: 14, text: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth." }
                ]}]
            },
            { book: "Acts", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "The former treatise have I made, O Theophilus, of all that Jesus began both to do and teach," }] }] },
            { book: "Romans", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Paul, a servant of Jesus Christ, called to be an apostle, separated unto the gospel of God," }] }] },
            { book: "1 Corinthians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Paul, called to be an apostle of Jesus Christ through the will of God, and Sosthenes our brother," }] }] },
            { book: "2 Corinthians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Paul, an apostle of Jesus Christ by the will of God, and Timothy our brother, unto the church of God which is at Corinth, with all the saints which are in all Achaia:" }] }] },
            { book: "Galatians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Paul, an apostle, (not of men, neither by man, but by Jesus Christ, and God the Father, who raised him from the dead;)" }] }] },
            { book: "Ephesians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Paul, an apostle of Jesus Christ by the will of God, to the saints which are at Ephesus, and to the faithful in Christ Jesus:" }] }] },
            { book: "Philippians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Paul and Timotheus, the servants of Jesus Christ, to all the saints in Christ Jesus which are at Philippi, with the bishops and deacons:" }] }] },
            { book: "Colossians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Paul, an apostle of Jesus Christ by the will of God, and Timotheus our brother," }] }] },
            { book: "1 Thessalonians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Paul, and Silvanus, and Timotheus, unto the church of the Thessalonians which is in God the Father and in the Lord Jesus Christ: Grace be unto you, and peace, from God our Father, and the Lord Jesus Christ." }] }] },
            { book: "2 Thessalonians", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Paul, and Silvanus, and Timotheus, unto the church of the Thessalonians in God our Father and the Lord Jesus Christ:" }] }] },
            { book: "1 Timothy", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Paul, an apostle of Jesus Christ by the commandment of God our Saviour, and Lord Jesus Christ, which is our hope;" }] }] },
            { book: "2 Timothy", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Paul, an apostle of Jesus Christ by the will of God, according to the promise of life which is in Christ Jesus," }] }] },
            { book: "Titus", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Paul, a servant of God, and an apostle of Jesus Christ, according to the faith of God's elect, and the acknowledging of the truth which is after godliness;" }] }] },
            { book: "Philemon", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Paul, a prisoner of Jesus Christ, and Timothy our brother, unto Philemon our dearly beloved, and fellowlabourer," }] }] },
            { book: "Hebrews", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "God, who at sundry times and in divers manners spake in time past unto the fathers by the prophets," }] }] },
            { book: "James", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "James, a servant of God and of the Lord Jesus Christ, to the twelve tribes which are scattered abroad, greeting." }] }] },
            { book: "1 Peter", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "Peter, an apostle of Jesus Christ, to the strangers scattered throughout Pontus, Galatia, Cappadocia, Asia, and Bithynia," }] }] },
            { book: "2 Peter", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "Simon Peter, a servant and an apostle of Jesus Christ, to them that have obtained like precious faith with us through the righteousness of God and our Saviour Jesus Christ:" }] }] },
            { book: "1 John", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "That which was from the beginning, which we have heard, which we have seen with our eyes, which we have looked upon, and our hands have handled, of the Word of life;" }] }] },
            { book: "2 John", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [{ verse: 1, text: "The elder unto the elect lady and her children, whom I love in the truth; and not I only, but also all they that have known the truth;" }] }] },
            { book: "3 John", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [{ verse: 1, text: "The elder unto the wellbeloved Gaius, whom I love in the truth." }] }] },
            { book: "Jude", chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-2.mp3", verses: [{ verse: 1, text: "Jude, the servant of Jesus Christ, and brother of James, to them that are sanctified by God the Father, and preserved in Jesus Christ, and called:" }] }] },
            {
                book: "Revelation",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-3.mp3", verses: [
                    { verse: 1, text: "The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant John:" },
                ]}]
            },
        ]
    },
    {
        version: "NIV",
        books: [
            {
                book: "Genesis",
                chapters: [
                    {
                        chapter: 1,
                        audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3",
                        verses: [
                            { verse: 1, text: "In the beginning God created the heavens and the earth." },
                            { verse: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
                            { verse: 3, text: "And God said, “Let there be light,” and there was light." },
                            { verse: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
                            { verse: 5, text: "God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day." },
                            { verse: 27, text: "So God created mankind in his own image, in the image of God he created them; male and female he created them." }
                        ]
                    }
                ]
            },
            {
                book: "John",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [
                    { verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
                    { verse: 14, text: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth." }
                ]}]
            },
        ]
    },
    {
        version: "NKJV",
        books: [
            {
                book: "Genesis",
                chapters: [
                    {
                        chapter: 1,
                        audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3",
                        verses: [
                            { verse: 1, text: "In the beginning God created the heavens and the earth." },
                            { verse: 2, text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters." },
                            { verse: 3, text: "Then God said, “Let there be light”; and there was light." },
                            { verse: 4, text: "And God saw the light, that it was good; and God divided the light from the darkness." },
                            { verse: 5, text: "God called the light Day, and the darkness He called Night. So the evening and the morning were the first day." },
                            { verse: 27, text: "So God created man in His own image; in the image of God He created him; male and female He created them." }
                        ]
                    }
                ]
            },
            {
                book: "John",
                chapters: [{ chapter: 1, audioUrl: "https://storage.googleapis.com/web-dev-assets/dclm-sermons/sermon-1.mp3", verses: [
                    { verse: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
                    { verse: 14, text: "And the Word became flesh and dwelt among us, and we beheld His glory, the glory as of the only begotten of the Father, full of grace and truth." }
                ]}]
            },
        ]
    }
];
