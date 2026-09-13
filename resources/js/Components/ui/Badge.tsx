import React from 'react';
import { cn } from '@/utils/cn';
import { ItemConditionType } from '@/types/siprana';

interface BadgeProps {
    condition?: ItemConditionType;
    children?: React.ReactNode;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ condition, children, className }) => {
    const conditionStyles: Record<ItemConditionType, { text: string; bg: string }> = {
        good: { text: 'Baik', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        light_damage: { text: 'Rusak Ringan', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
        heavy_damage: { text: 'Rusak Berat', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
    };

    if (condition) {
        const item = conditionStyles[condition];
        return (
            <span className={cn("inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border", item.bg, className)}>
                {item.text}
            </span>
        );
    }

    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border bg-slate-50 text-slate-700 border-slate-200", className)}>
            {children}
        </span>
    );
};