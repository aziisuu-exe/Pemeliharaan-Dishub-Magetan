import React from 'react';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Card } from '@/Components/ui/Card';

interface DashboardStatCardProps {
    title: string;
    value: number | string;
    subtitle: string;
    icon: LucideIcon;
    iconBgColor?: string;
    iconColor?: string;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconBgColor = 'bg-blue-50 border-blue-100',
    iconColor = 'text-blue-600',
}) => {
    return (
        <Card className="p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>
                </div>
                <div className={cn("p-3 rounded-md border flex items-center justify-center", iconBgColor, iconColor)}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </Card>
    );
};