import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
// FIX: Added User type to be used in context
import type { UserRole, UserProfile, User } from '../types';

interface AuthContextType {
    // FIX: Added user to context
    user: User | null;
    // FIX: Added login and logout to context
    login: (user: User) => void;
    logout: () => void;
    userRole: UserRole;
    setUserRole: Dispatch<SetStateAction<UserRole>>;
    isDarkMode: boolean;
    setIsDarkMode: Dispatch<SetStateAction<boolean>>;
    userProfile: UserProfile;
    setUserProfile: Dispatch<SetStateAction<UserProfile>>;
    originalUserProfile: UserProfile;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
    handleSaveChanges: () => void;
    handleCancelChanges: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialProfile: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'A dedicated member of the Deeper Life Bible Church, passionate about spiritual growth and community service.',
    profilePictureUrl: `https://avatar.iran.liara.run/public/boy?username=johndoe`,
    growth: {
      bibleReading: 75,
      sermonsWatched: 90,
      hymnsLearned: 60,
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // FIX: Added user state
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<UserRole>('member');
    const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
    const [originalUserProfile, setOriginalUserProfile] = useState<UserProfile>({ ...userProfile });
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) return savedMode === 'true';
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // FIX: Implemented login and logout functions
    const login = (userData: User) => {
        setUser(userData);
        setUserRole(userData.role);
        const newProfile = {
            ...initialProfile, // keep defaults like bio and growth
            name: userData.full_name,
            email: userData.email,
            phone: userData.phone_number,
            profilePictureUrl: `https://avatar.iran.liara.run/public/${userData.gender === 'female' ? 'girl' : 'boy'}?username=${userData.username}`
        };
        setUserProfile(newProfile);
        setOriginalUserProfile(newProfile);
    };

    const logout = () => {
        setUser(null);
        setUserRole('member');
        setUserProfile(initialProfile);
        setOriginalUserProfile(initialProfile);
    };


    const handleSaveChanges = () => {
        setOriginalUserProfile({ ...userProfile });
        setHasUnsavedChanges(false);
        alert("Profile saved successfully!");
    };

    const handleCancelChanges = () => {
        setUserProfile({ ...originalUserProfile });
        setHasUnsavedChanges(false);
    };

    return (
        <AuthContext.Provider value={{ 
            user, login, logout,
            userRole, setUserRole, 
            isDarkMode, setIsDarkMode,
            userProfile, setUserProfile,
            originalUserProfile,
            hasUnsavedChanges, setHasUnsavedChanges,
            handleSaveChanges, handleCancelChanges
        }}>
            {children}
        </AuthContext.Provider>
    );
};
