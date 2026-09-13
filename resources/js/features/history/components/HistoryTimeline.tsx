import React from 'react';
import { Maintenance } from '@/types/siprana';
import { Badge } from '@/Components/ui/Badge';
import { Wrench, User } from 'lucide-react';

interface HistoryTimelineProps {
    maintenances: Maintenance[];
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ maintenances }) => {
    if (!maintenances || maintenances.length === 0) {
        return <p className="text-xs text-slate-500 py-4">Belum ada tindakan yang tercatat.</p>;
    }

    return (
        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            {maintenances.map((m) => (
                <div key={m.id} className="relative flex items-start space-x-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-700 text-white shrink-0 z-10">
                        <Wrench className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-md p-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-semibold text-slate-700">
                                {m.maintenance_date}
                            </span>
                            <div className="flex items-center space-x-1 text-xs">
                                <Badge condition={m.condition_before} />
                                <span className="text-slate-400">→</span>
                                <Badge condition={m.condition_after} />
                            </div>
                        </div>
                        <p className="text-sm text-slate-800 mb-2">{m.action_description}</p>
                        <div className="flex items-center text-xs text-slate-500">
                            <User className="w-3.5 h-3.5 mr-1" />
                            <span>Petugas: {m.user?.name ?? '-'}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};