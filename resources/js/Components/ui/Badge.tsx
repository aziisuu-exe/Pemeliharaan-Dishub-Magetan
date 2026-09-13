import React from 'react';
import { ItemCondition, ItemConditionType } from '@/types/siprana';

interface BadgeProps {
    condition: ItemCondition | ItemConditionType | string;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ condition, className = '' }) => {
    const config: Record<string, { label: string; style: string }> = {
        good: {
            label: 'Baik',
            style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        light_damage: {
            label: 'Rusak Ringan',
            style: 'bg-amber-50 text-amber-700 border-amber-200',
        },
        heavy_damage: {
            label: 'Rusak Berat',
            style: 'bg-rose-50 text-rose-700 border-rose-200',
        },
    };

    const current = config[condition] ?? {
        label: condition,
        style: 'bg-slate-50 text-slate-700 border-slate-200',
    };

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${current.style} ${className}`}
        >
            {current.label}
        </span>
    );
};