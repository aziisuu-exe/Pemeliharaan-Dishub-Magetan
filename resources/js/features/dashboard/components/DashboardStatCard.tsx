import React from 'react';
import { Card } from '@/Components/ui/Card';
import { LucideIcon } from 'lucide-react';

export interface DashboardStatCardProps {
    title?: string;
    label?: string;
    value: string | number;
    icon: LucideIcon;
    iconColor?: string;
    iconBg?: string;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
    title,
    label,
    value,
    icon: Icon,
    iconColor = 'text-blue-600',
    iconBg = 'bg-blue-50',
}) => {
    return (
        <Card className="p-5 flex items-center justify-between">
            <div className="space-y-1">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                    {title ?? label}
                </span>
                <span className="text-2xl font-bold text-slate-800 tracking-tight block">
                    {value}
                </span>
            </div>
            <div className={`p-3 rounded-md ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
            </div>
        </Card>
    );
};