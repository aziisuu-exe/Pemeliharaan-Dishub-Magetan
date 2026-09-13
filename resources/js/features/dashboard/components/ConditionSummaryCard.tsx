import React from 'react';

import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { Card } from '@/Components/ui/Card';

interface ConditionSummaryCardProps {
    conditions: {
        good: number;
        light_damage: number;
        heavy_damage: number;
    };
}

export const ConditionSummaryCard: React.FC<ConditionSummaryCardProps> = ({ conditions }) => {
    return (
        <Card title="Rekapitulasi Kondisi Sarana Prasarana" className="h-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-md border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-800">Kondisi Baik</span>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-bold text-emerald-900">{conditions.good}</span>
                        <span className="text-xs text-emerald-700 ml-1">Unit</span>
                    </div>
                </div>

                <div className="p-4 rounded-md border border-amber-200 bg-amber-50/50 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-800">Rusak Ringan</span>
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-bold text-amber-900">{conditions.light_damage}</span>
                        <span className="text-xs text-amber-700 ml-1">Unit</span>
                    </div>
                </div>

                <div className="p-4 rounded-md border border-rose-200 bg-rose-50/50 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-rose-800">Rusak Berat</span>
                        <AlertOctagon className="w-4 h-4 text-rose-600" />
                    </div>
                    <div className="mt-3">
                        <span className="text-2xl font-bold text-rose-900">{conditions.heavy_damage}</span>
                        <span className="text-xs text-rose-700 ml-1">Unit</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};