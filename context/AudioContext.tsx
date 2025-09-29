import React, { createContext, useState, useRef, useEffect, useContext, ReactNode } from 'react';
import type { AudioContextType, AudioTrack } from '../types';

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const liveRadioStreams: Record<string, string> = {
    English: 'https://stream.radio.co/s83741157e/listen',
    Yoruba: 'https://stream.radio.co/s079be84e6/listen',
    Igbo: 'https://stream.radio.co/s5c34e82c3/listen',
    French: 'https://stream.radio.co/s2c67cf17b/listen',
};

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [streamLanguage, setStreamLanguage] = useState('English');
    
    const audioRef = useRef<HTMLAudioElement>(null);

    const playTrack = (track: AudioTrack) => {
        // If the same track is clicked, toggle play/pause
        if (currentTrack?.title === track.title && currentTrack?.artist === track.artist) {
            togglePlay();
        } else {
            // Otherwise, set the new track and start playing
            setCurrentTrack(track);
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (currentTrack) {
            setIsPlaying(prev => !prev);
        }
    };

    // This single effect manages the audio element's state based on React state, fixing race conditions.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (currentTrack) {
            const newUrl = currentTrack.type === 'radio' ? liveRadioStreams[streamLanguage] : currentTrack.url;

            // Only update src if it's different to avoid re-buffering
            if (audio.src !== newUrl) {
                audio.src = newUrl;
                audio.load();
            }

            if (isPlaying) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        // The 'AbortError' is expected when a user quickly clicks another track,
                        // interrupting the current playback. We can safely ignore it.
                        if (error.name !== 'AbortError') {
                            console.error("Audio playback failed:", error);
                            // If playback fails for another reason, update the state.
                            setIsPlaying(false);
                        }
                    });
                }
            } else {
                audio.pause();
            }
        } else {
            // No track is selected.
            audio.pause();
            audio.src = '';
        }
    }, [currentTrack, isPlaying, streamLanguage]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    return (
        <AudioContext.Provider value={{
            currentTrack, isPlaying, playTrack, togglePlay, audioRef, progress, duration, streamLanguage, setStreamLanguage
        }}>
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};