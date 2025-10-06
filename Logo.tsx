import React from 'react';

interface LogoProps {
  variant?: 'full' | 'sidebar';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
    const icon = (
        <div className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center shadow-md flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14"/>
                </svg>
            </div>
        </div>
    );
    
    if (variant === 'sidebar') {
         return (
            <div className={`flex items-center ${className}`}>
                {icon}
                <div className="ml-3">
                    <span className="text-lg font-bold leading-tight">Deeper Life</span>
                    <p className="text-xs italic leading-tight opacity-80">...achieving heaven's goal</p>
                </div>
            </div>
        );
    }
    
    // Default 'full' variant for login page
    return (
        <div className={`flex flex-col items-center text-center ${className}`}>
            <div className="w-16 h-16 rounded-full bg-primary-900 flex items-center justify-center shadow-md">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                </div>
            </div>
            <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mt-4 tracking-tight">
                DEEPER LIFE BIBLE CHURCH
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm italic mt-1">...achieving heaven's goal</p>
        </div>
    );
};

export default Logo;