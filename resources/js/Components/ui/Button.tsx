import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#182156] hover:bg-[#101740] text-white border border-[#141b46]",
        secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300",
        danger: "bg-red-600 hover:bg-red-700 text-white border border-red-700",
        outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300",
    };

    const sizes = {
        sm: "text-xs px-2.5 py-1.5 h-8",
        md: "text-xs px-3.5 py-2 h-9",
        lg: "text-sm px-4 py-2.5 h-10",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
            {children}
        </button>
    );
};