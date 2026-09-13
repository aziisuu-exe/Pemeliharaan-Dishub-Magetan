import { Card } from '@/Components/ui/Card';
import React from 'react';


interface ConditionDistributionCardProps {
    good: number;
    lightDamage: number;
    heavyDamage: number;
}

export const ConditionDistributionCard: React.FC<ConditionDistributionCardProps> = ({
    good,
    lightDamage,
    heavyDamage,
}) => {
    const total = good + lightDamage + heavyDamage;
    const goodPct = total > 0 ? Math.round((good / total) * 100) : 0;
    const lightPct = total > 0 ? Math.round((lightDamage / total) * 100) : 0;
    const heavyPct = total > 0 ? Math.round((heavyDamage / total) * 100) : 0;

    return (
        <Card title="Distribusi Kondisi Fisik Sarpras">
            <div className="space-y-4 pt-1">
                <div className="h-3 w-full rounded-md bg-slate-100 overflow-hidden flex border border-slate-200">
                    <div style={{ width: `${goodPct}%` }} className="bg-emerald-500 h-full" />
                    <div style={{ width: `${lightPct}%` }} className="bg-amber-500 h-full" />
                    <div style={{ width: `${heavyPct}%` }} className="bg-rose-500 h-full" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            <span className="text-xs text-slate-600 font-medium">Baik</span>
                        </div>
                        <p className="text-lg font-bold text-slate-800 mt-1">{good} <span className="text-xs font-normal text-slate-500">Unit</span></p>
                        <p className="text-[11px] text-emerald-600 font-medium">{goodPct}% total</p>
                    </div>

                    <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                            <span className="text-xs text-slate-600 font-medium">Rusak Ringan</span>
                        </div>
                        <p className="text-lg font-bold text-slate-800 mt-1">{lightDamage} <span className="text-xs font-normal text-slate-500">Unit</span></p>
                        <p className="text-[11px] text-amber-600 font-medium">{lightPct}% total</p>
                    </div>

                    <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                            <span className="text-xs text-slate-600 font-medium">Rusak Berat</span>
                        </div>
                        <p className="text-lg font-bold text-slate-800 mt-1">{heavyDamage} <span className="text-xs font-normal text-slate-500">Unit</span></p>
                        <p className="text-[11px] text-rose-600 font-medium">{heavyPct}% total</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};