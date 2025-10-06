import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { Play, Pause, Volume2, SkipForward, SkipBack, Radio, Volume, Volume1, VolumeX } from 'lucide-react';

const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const GlobalAudioPlayer: React.FC = () => {
    const { currentTrack, isPlaying, togglePlay, audioRef, progress, duration } = useAudio();
    const [volume, setVolume] = useState(1);
    const [isVolumeSliderVisible, setVolumeSliderVisible] = useState(false);

    if (!currentTrack) {
        return null;
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
        }
    };
    
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };
    
    const VolumeIcon = () => {
        if (volume === 0) return <VolumeX size={20} />;
        if (volume < 0.5) return <Volume size={20} />;
        if (volume < 0.8) return <Volume1 size={20} />;
        return <Volume2 size={20} />;
    };

    const isLive = currentTrack.type === 'radio';

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-4">
            <div className="bg-gray-900/50 text-white backdrop-blur-md border border-white/10 shadow-2xl p-3 flex items-center gap-4 rounded-xl">
                <img 
                    src={currentTrack.artwork || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzE3MjU1NCIvPjxwYXRoIGQ9Ik0xNiA4djE2bTgtOEg4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg=='} 
                    alt={currentTrack.title} 
                    className="w-16 h-16 rounded-md object-cover"
                />
                
                <div className="hidden md:block flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        {isLive && <Radio size={16} className="text-red-500 animate-pulse flex-shrink-0" />}
                        <p className="font-bold truncate">{currentTrack.title}</p>
                    </div>
                    <p className="text-sm text-gray-300 truncate">{currentTrack.artist}</p>
                </div>

                <div className="flex items-center justify-center gap-2 md:gap-4 flex-1 md:flex-initial">
                    <button className="text-gray-300 hover:text-white transition-colors"><SkipBack size={22} /></button>
                    <button 
                        onClick={togglePlay}
                        className="bg-white text-gray-900 rounded-full p-4 hover:scale-105 transition-transform"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current ml-1" />}
                    </button>
                    <button className="text-gray-300 hover:text-white transition-colors"><SkipForward size={22} /></button>
                </div>
                
                <div className="hidden sm:flex items-center gap-3 flex-1">
                    <span className="text-xs text-gray-300 w-10 text-right">{formatTime(progress)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={progress}
                        onChange={handleProgressChange}
                        disabled={isLive}
                        className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                    />
                    <span className="text-xs text-gray-300 w-10">{isLive ? 'LIVE' : formatTime(duration)}</span>
                    <div className="relative" onMouseEnter={() => setVolumeSliderVisible(true)} onMouseLeave={() => setVolumeSliderVisible(false)}>
                        <button className="text-gray-300 hover:text-white transition-colors">
                            <VolumeIcon/>
                        </button>
                        {isVolumeSliderVisible && (
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 -rotate-90 w-20 h-4 appearance-none cursor-pointer bg-transparent [&::-webkit-slider-runnable-track]:bg-white/20 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                           />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalAudioPlayer;