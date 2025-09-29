import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { Video, Plus, Keyboard, Users, MessageSquare, Mic, MicOff, VideoOff, ScreenShare, PhoneOff, MoreVertical, Copy, ChevronLeft, X } from 'lucide-react';

const mockParticipants = [
    { id: 1, name: 'Pastor W.F. Kumuyi', isHost: true, isMuted: false, isCameraOn: true, avatar: 'https://avatar.iran.liara.run/public/8' },
    { id: 2, name: 'You', isHost: false, isMuted: true, isCameraOn: false, avatar: '' }, // Local user
    { id: 3, name: 'Grace Adebayo', isHost: false, isMuted: false, isCameraOn: true, avatar: 'https://avatar.iran.liara.run/public/girl?username=grace' },
    { id: 4, name: 'Samuel Okoro', isHost: false, isMuted: true, isCameraOn: true, avatar: 'https://avatar.iran.liara.run/public/boy?username=samuel' },
    { id: 5, name: 'John Doe', isHost: false, isMuted: false, isCameraOn: false, avatar: 'https://avatar.iran.liara.run/public/boy?username=johndoe' },
];

const mockChatMessages = [
    { from: 'Grace Adebayo', time: '10:05 AM', text: 'Good morning everyone! Blessed to be here.' },
    { from: 'You', time: '10:06 AM', text: 'Good morning, sister Grace. Welcome.' },
    { from: 'Pastor W.F. Kumuyi', time: '10:07 AM', text: "Welcome, brethren. We will be starting in a few minutes. Please let's remain in the spirit of prayer." },
];

const scheduledMeetings = [
    { id: 'meet1', title: "State Overseers' Meeting", time: 'Monday, Oct 30 @ 10:00 AM', code: 'DLM-STATE-OVRS' },
    { id: 'meet2', title: "Regional Pastors' Briefing", time: 'Wednesday, Nov 1 @ 4:00 PM', code: 'DLM-REG-PAST' },
    { id: 'meet3', title: "Youth Leaders' Connect", time: 'Friday, Nov 3 @ 6:00 PM', code: 'DLM-YOUTH-CON' },
];

// --- In-Meeting Sub-Components ---

const ParticipantView: React.FC<{ name: string; isMuted: boolean; isCameraOn: boolean; avatar?: string; isSpeaking?: boolean }> = ({ name, isMuted, isCameraOn, avatar, isSpeaking }) => (
    <div className={`relative aspect-video bg-gray-800 dark:bg-black rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'ring-4 ring-green-500' : 'ring-1 ring-gray-700'}`}>
        {isCameraOn ? (
             <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: `url(https://picsum.photos/seed/${name}/400/225)`}}></div>
        ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover"/>
            </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center">
                {isMuted ? <MicOff size={14} className="text-white" /> : <Mic size={14} className="text-white" />}
                <span className="text-white text-sm font-medium ml-2 truncate">{name}</span>
            </div>
        </div>
    </div>
);

const MeetingControls: React.FC<{
    onLeave: () => void;
    toggleMic: () => void; isMicOn: boolean;
    toggleCam: () => void; isCamOn: boolean;
    toggleParticipants: () => void;
    toggleChat: () => void;
}> = ({ onLeave, toggleMic, isMicOn, toggleCam, isCamOn, toggleParticipants, toggleChat }) => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-3 bg-gray-800/50 dark:bg-gray-900/50 backdrop-blur-md p-3 rounded-full shadow-2xl">
        <button onClick={toggleMic} className={`p-3 rounded-full transition-colors ${isMicOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'} text-white`}>
            {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
        </button>
        <button onClick={toggleCam} className={`p-3 rounded-full transition-colors ${isCamOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'} text-white`}>
            {isCamOn ? <Video size={22} /> : <VideoOff size={22} />}
        </button>
        <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"><ScreenShare size={22} /></button>
        <button onClick={toggleParticipants} className="p-3 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"><Users size={22} /></button>
        <button onClick={toggleChat} className="p-3 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"><MessageSquare size={22} /></button>
        <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-colors"><MoreVertical size={22} /></button>
        <div className="w-px h-8 bg-gray-500 mx-2"></div>
        <button onClick={onLeave} className="px-5 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white transition-colors"><PhoneOff size={22} /></button>
    </div>
);

const ParticipantsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-bold">Participants ({mockParticipants.length})</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
            {mockParticipants.map(p => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                    <div className="flex items-center gap-3">
                        <img src={p.avatar || `https://avatar.iran.liara.run/public/${p.id}`} alt={p.name} className="w-9 h-9 rounded-full"/>
                        <span className="font-medium">{p.name} {p.isHost && '(Host)'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {p.isMuted ? <MicOff size={18} className="text-gray-400"/> : <Mic size={18} className="text-blue-500"/>}
                        {p.isCameraOn ? <Video size={18} className="text-blue-500"/> : <VideoOff size={18} className="text-gray-400"/>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ChatPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => (
     <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-bold">In-call Messages</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockChatMessages.map((msg, i) => (
                <div key={i}>
                    <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm">{msg.from}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{msg.text}</p>
                </div>
            ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <input type="text" placeholder="Send a message..." className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
        </div>
    </div>
);


// --- Meeting Room View ---

const MeetingRoom: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
    const { userProfile } = useAuth();
    const localUser = mockParticipants.find(p => p.name === 'You');
    const remoteParticipants = mockParticipants.filter(p => p.name !== 'You');
    if(localUser) localUser.avatar = userProfile.profilePictureUrl;

    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);
    const [showParticipants, setShowParticipants] = useState(false);
    const [showChat, setShowChat] = useState(false);
    
    const isSidePanelOpen = showParticipants || showChat;

    return (
        <div className="w-full h-[calc(100vh-5rem)] bg-gray-900 dark:bg-black text-white flex flex-col relative overflow-hidden">
            <header className="p-4 flex items-center justify-between">
                <button onClick={onLeave} className="flex items-center gap-2 text-sm hover:bg-gray-700/50 p-2 rounded-md">
                    <ChevronLeft size={18}/> Back to Hub
                </button>
                <div className="text-center">
                    <h2 className="font-bold text-lg">State Overseers' Meeting</h2>
                    <p className="text-sm text-gray-400">34:17</p>
                </div>
                <div className="w-28"></div>
            </header>

            <main className="flex-1 flex p-4 gap-4 overflow-hidden">
                <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidePanelOpen ? 'w-3/4' : 'w-full'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 h-full overflow-y-auto">
                        <ParticipantView name="Pastor W.F. Kumuyi" isMuted={false} isCameraOn={true} isSpeaking avatar="https://avatar.iran.liara.run/public/8"/>
                        {remoteParticipants.map(p => (
                             <ParticipantView key={p.id} name={p.name} isMuted={p.isMuted} isCameraOn={p.isCameraOn} avatar={p.avatar} />
                        ))}
                         {localUser && <ParticipantView name={localUser.name} isMuted={!isMicOn} isCameraOn={isCamOn} avatar={localUser.avatar} />}
                    </div>
                </div>
                <aside className={`transition-transform duration-300 ease-in-out ${isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'} w-full max-w-sm`}>
                   {showParticipants && <ParticipantsPanel onClose={() => setShowParticipants(false)}/>}
                   {showChat && <ChatPanel onClose={() => setShowChat(false)}/>}
                </aside>
            </main>
            
            <MeetingControls
                onLeave={onLeave}
                isMicOn={isMicOn}
                toggleMic={() => setIsMicOn(prev => !prev)}
                isCamOn={isCamOn}
                toggleCam={() => setIsCamOn(prev => !prev)}
                toggleParticipants={() => {setShowParticipants(p => !p); setShowChat(false);}}
                toggleChat={() => {setShowChat(c => !c); setShowParticipants(false);}}
            />
        </div>
    );
};


// --- Meeting Lobby View ---

const MeetingLobby: React.FC<{ onJoinMeeting: () => void }> = ({ onJoinMeeting }) => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-50">Online Meetings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="dark:bg-gray-800 text-center p-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-4">
                        <Plus size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">New Meeting</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Start an instant meeting</p>
                    <Button onClick={onJoinMeeting}>
                        <Video className="w-5 h-5 mr-2" /> Start Now
                    </Button>
                </Card>
                <Card className="dark:bg-gray-800 text-center p-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 flex items-center justify-center mb-4">
                        <Keyboard size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Join a Meeting</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Enter a code or link</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Enter code" className="flex-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-md px-3 py-2 text-sm"/>
                        <Button variant="ghost" onClick={onJoinMeeting}>Join</Button>
                    </div>
                </Card>
            </div>

            <Card className="dark:bg-gray-800">
                <h2 className="text-xl font-bold mb-4">Scheduled Meetings</h2>
                <div className="space-y-3">
                    {scheduledMeetings.map(meet => (
                        <div key={meet.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{meet.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{meet.time}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"><Copy size={14}/> {meet.code}</button>
                                <Button size="sm" onClick={onJoinMeeting}>Join</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};


// --- Main Exported Component ---

const Meetings: React.FC = () => {
    const [inMeeting, setInMeeting] = useState(false);

    if (inMeeting) {
        return <MeetingRoom onLeave={() => setInMeeting(false)} />;
    }
    
    return <MeetingLobby onJoinMeeting={() => setInMeeting(true)} />;
};

export default Meetings;