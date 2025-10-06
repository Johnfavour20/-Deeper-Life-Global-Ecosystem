import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    // FIX: Added size prop to support different button sizes.
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    // FIX: Removed padding from base classes to be handled by size variants.
    const baseClasses = 'rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
    
    const variantClasses = {
        primary: 'bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-500',
        secondary: 'bg-secondary text-white hover:bg-red-600 focus:ring-secondary',
        ghost: 'bg-transparent text-primary-700 hover:bg-primary-100',
    };

    // FIX: Added size classes to dynamically apply padding and text size.
    const sizeClasses = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };


    return (
        <button className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;