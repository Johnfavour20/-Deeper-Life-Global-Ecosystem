import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { Play, Pause, Volume2, SkipForward, SkipBack, Radio } from 'lucide-react';

const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const GlobalAudioPlayer: React.FC = () => {
    const { currentTrack, isPlaying, togglePlay, audioRef, progress, duration } = useAudio();

    if (!currentTrack) {
        return null;
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
        }
    };

    const isLive = currentTrack.type === 'radio';

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="bg-gray-900 text-white shadow-2xl shadow-black/50 p-3 flex items-center gap-2 md:gap-4">
                <img 
                    src={currentTrack.artwork || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzE3MjU1NCIvPjxwYXRoIGQ9Ik0xNiA4djE2bTgtOEg4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg=='} 
                    alt={currentTrack.title} 
                    className="w-14 h-14 rounded-md object-cover"
                />
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        {isLive && <Radio size={16} className="text-red-500 animate-pulse flex-shrink-0" />}
                        <p className="font-bold truncate">{currentTrack.title}</p>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
                </div>

                <div className="flex items-center justify-center gap-2 md:gap-4">
                    <button className="text-gray-400 hover:text-white transition-colors"><SkipBack size={20} /></button>
                    <button 
                        onClick={togglePlay}
                        className="bg-white text-gray-900 rounded-full p-3 hover:scale-105 transition-transform"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-1" />}
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors"><SkipForward size={20} /></button>
                </div>
                
                <div className="hidden sm:flex items-center gap-2 md:gap-3 flex-1">
                    <span className="hidden md:block text-xs text-gray-400 w-10 text-right">{formatTime(progress)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={progress}
                        onChange={handleProgressChange}
                        disabled={isLive}
                        className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                    />
                    <span className="text-xs text-gray-400 w-10">{isLive ? 'LIVE' : formatTime(duration)}</span>
                    <Volume2 size={20} className="hidden lg:block text-gray-400"/>
                </div>
            </div>
        </div>
    );
};

export default GlobalAudioPlayer;