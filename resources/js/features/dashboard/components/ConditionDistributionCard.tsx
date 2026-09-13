import React from 'react';
import { Card } from '@/Components/ui/Card';
import { ConditionDistribution } from '../types';

interface ConditionDistributionCardProps {
    distribution: ConditionDistribution;
}

export const ConditionDistributionCard: React.FC<ConditionDistributionCardProps> = ({ distribution }) => {
    return (
        <Card className="p-5 h-full flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Distribusi Kondisi Fisik Sarpras</h3>

            <div className="w-full h-2.5 bg-slate-100 rounded-md flex overflow-hidden mb-4">
                <div style={{ width: `${distribution.good_pct}%` }} className="bg-emerald-500 h-full" />
                <div style={{ width: `${distribution.light_damage_pct}%` }} className="bg-amber-500 h-full" />
                <div style={{ width: `${distribution.heavy_damage_pct}%` }} className="bg-rose-500 h-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-md">
                    <div className="flex items-center space-x-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-slate-700">Baik</span>
                    </div>
                    <p className="text-base font-bold text-slate-800">{distribution.good} Unit</p>
                    <p className="text-[11px] text-emerald-600 font-medium">{distribution.good_pct}% total</p>
                </div>

                <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-md">
                    <div className="flex items-center space-x-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-xs font-medium text-slate-700">Rusak Ringan</span>
                    </div>
                    <p className="text-base font-bold text-slate-800">{distribution.light_damage} Unit</p>
                    <p className="text-[11px] text-amber-600 font-medium">{distribution.light_damage_pct}% total</p>
                </div>

                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-md">
                    <div className="flex items-center space-x-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-xs font-medium text-slate-700">Rusak Berat</span>
                    </div>
                    <p className="text-base font-bold text-slate-800">{distribution.heavy_damage} Unit</p>
                    <p className="text-[11px] text-rose-600 font-medium">{distribution.heavy_damage_pct}% total</p>
                </div>
            </div>
        </Card>
    );
};