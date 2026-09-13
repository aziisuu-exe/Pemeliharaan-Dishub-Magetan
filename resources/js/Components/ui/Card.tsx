import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, title, action }) => {
    return (
        <div className={cn("bg-white border border-slate-200 rounded-md", className)}>
            {(title || action) && (
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    {title && <h3 className="text-base font-semibold text-slate-800">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-5">{children}</div>
        </div>
    );
};