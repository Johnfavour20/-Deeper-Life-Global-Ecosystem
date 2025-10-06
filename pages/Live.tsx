import React, { useState, useRef, useEffect } from 'react';
import { ThumbsUp, Share2, Send, Users, Heart, Video, VideoOff, Mic, MicOff, Tv, Power, ChevronLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { rolePrivilegeLevels } from '../constants';
import type { UserProfile } from '../types';
import { mockGCKEventInfo } from '../data/mockData';

const mockLiveChat = [
    { user: 'Grace A.', message: 'Hallelujah! What a powerful word!' },
    { user: 'Samuel O.', message: 'Amen! The presence of God is mighty here.' },
    { user: 'David M.', message: 'Thank you Pastor for this timely message.' },
    { user: 'Patience M.', message: 'Watching from the UK, glory to God! 🙏' },
    { user: 'John D.', message: 'This is a word in season for me. Thank you Jesus.' },
    { user: 'Esther I.', message: 'Hallelujah! My faith is stirred.' },
];

const ChatMessage: React.FC<{ user: string, message: string }> = ({ user, message }) => (
    <div className="flex items-start space-x-2">
        <img src={`https://avatar.iran.liara.run/public/${user.length % 2 === 0 ? 'boy' : 'girl'}?username=${user.replace(/\s/g, '')}`} alt={user} className="w-8 h-8 rounded-full" />
        <div>
            <p className="font-semibold text-sm text-gray-600 dark:text-gray-400">{user}</p>
            <p className="text-gray-800 dark:text-gray-200">{message}</p>
        </div>
    </div>
);


const LiveChat: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => (
    <div className="w-full lg:w-96 bg-white dark:bg-gray-800 flex flex-col border-l border-gray-200 dark:border-gray-700 h-1/2 lg:h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Live Chat</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockLiveChat.map((chat, index) => (
                <ChatMessage key={index} user={chat.user} message={chat.message} />
            ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center space-x-2">
                <img src={userProfile.profilePictureUrl} alt="You" className="w-8 h-8 rounded-full" />
                <input
                    type="text"
                    placeholder="Say something..."
                    className="flex-1 bg-gray-100 dark:bg-gray-700 border-transparent rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                    <Send size={20} />
                </button>
            </div>
        </div>
    </div>
);

const StudioView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const { showToast } = useNotification();

    const [isLive, setIsLive] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing media devices.", err);
            showToast("Could not access camera and microphone. Please check permissions.", "error");
            onExit();
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const toggleMic = () => {
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => track.enabled = !isMicOn);
            setIsMicOn(!isMicOn);
        }
    };

    const toggleCamera = () => {
        if (streamRef.current) {
            streamRef.current.getVideoTracks().forEach(track => track.enabled = !isCameraOn);
            setIsCameraOn(!isCameraOn);
        }
    };
    
    const handleGoLive = () => {
        setIsLive(!isLive);
        showToast(isLive ? "Stream has ended." : "You are now live!", "success");
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-900 text-white relative">
            <header className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
                 <button onClick={onExit} className="flex items-center gap-2 text-sm bg-black/30 backdrop-blur-sm p-2 rounded-lg hover:bg-black/50">
                    <ChevronLeft size={18}/> Back to Audience View
                </button>
                 {isLive && (
                    <div className="flex items-center gap-4">
                        <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            LIVE
                        </span>
                        <span className="bg-black/50 text-white text-sm font-bold px-3 py-1 rounded-md flex items-center gap-2">
                            <Users size={16} /> 2.4M
                        </span>
                    </div>
                )}
            </header>

            <div className="flex-1 flex items-center justify-center bg-black">
                <video ref={videoRef} autoPlay muted className="w-full h-full object-contain" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/70 to-transparent flex justify-center">
                 <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md p-3 rounded-full shadow-2xl">
                    <button onClick={toggleMic} aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"} className={`p-3 rounded-full transition-colors ${isMicOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'} text-white`}>
                        {isMicOn ? <Mic size={22} /> : <MicOff size={22} />}
                    </button>
                    <button onClick={toggleCamera} aria-label={isCameraOn ? "Turn off camera" : "Turn on camera"} className={`p-3 rounded-full transition-colors ${isCameraOn ? 'bg-gray-600 hover:bg-gray-500' : 'bg-red-600 hover:bg-red-500'} text-white`}>
                        {isCameraOn ? <Video size={22} /> : <VideoOff size={22} />}
                    </button>
                    <div className="w-px h-8 bg-gray-500 mx-2"></div>
                    <button onClick={handleGoLive} className={`px-8 py-3 rounded-full font-bold transition-colors ${isLive ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'} text-white`}>
                        {isLive ? 'End Stream' : 'Go Live'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const Live: React.FC = () => {
    const { user, userProfile } = useAuth();
    const [isStudioMode, setStudioMode] = useState(false);
    const gckEvent = mockGCKEventInfo;
    
    // Only the General Superintendent can broadcast in this mock setup
    const canBroadcast = user && rolePrivilegeLevels[user.role] >= rolePrivilegeLevels['g_s'];

    if (isStudioMode && canBroadcast) {
        return (
             <div className="flex flex-col lg:flex-row h-full -m-4 sm:-m-6 lg:-m-8">
                <StudioView onExit={() => setStudioMode(false)} />
                <LiveChat userProfile={userProfile} />
             </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row h-full -m-4 sm:-m-6 lg:-m-8 relative">
            {canBroadcast && (
                <button
                    onClick={() => setStudioMode(true)}
                    className="absolute top-4 right-4 z-20 bg-red-600 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg"
                >
                    <Tv size={20} /> Go Live
                </button>
            )}
            
            <div className="flex-1 flex flex-col bg-black">
                <div className="flex-1 flex items-center justify-center relative bg-gray-900">
                    <img src={gckEvent.posterUrl} className="w-full h-full object-cover opacity-50" alt="Live Stream background" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                         {/* This part can be dynamic. If stream is offline, show message. If online, show video player. */}
                        <div className="text-center text-white p-4">
                            <h2 className="text-4xl font-bold drop-shadow-lg">{gckEvent.isLive ? "You are watching the Global Crusade" : "LIVE STREAM IS OFFLINE"}</h2>
                            <p className="mt-2 text-lg drop-shadow-md">{gckEvent.isLive ? gckEvent.theme : "The next broadcast will begin shortly."}</p>
                        </div>
                    </div>
                    
                    <div className="absolute top-4 left-4 flex items-center gap-4">
                         {gckEvent.isLive && (
                            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md flex items-center gap-2 animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                LIVE
                            </span>
                        )}
                        <span className="bg-black/50 text-white text-sm font-bold px-3 py-1 rounded-md flex items-center gap-2">
                            <Users size={16} /> 2.4M
                        </span>
                    </div>
                </div>
                <div className="p-4 bg-gray-800 text-white">
                    <h1 className="text-2xl font-bold">{gckEvent.title} - {gckEvent.theme}</h1>
                    <p className="text-gray-300">with {gckEvent.minister}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
                                <ThumbsUp size={24} />
                                <span>1.8M</span>
                            </button>
                             <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
                                <Heart size={24} />
                                <span>950K</span>
                            </button>
                        </div>
                        <button className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                            <Share2 size={20} />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>

            <LiveChat userProfile={userProfile} />
        </div>
    );
};

export default Live;
