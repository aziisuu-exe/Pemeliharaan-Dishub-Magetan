import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
    label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, label, id, children, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <select
                    id={id}
                    ref={ref}
                    className={cn(
                        "w-full h-9 px-3 text-sm rounded-md border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 transition-colors",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    {...props}
                >
                    {children}
                </select>
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';