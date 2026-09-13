import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, label, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={cn(
                        "w-full h-9 px-3 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-colors",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';