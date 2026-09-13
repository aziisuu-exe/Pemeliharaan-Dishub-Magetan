import React from 'react';
import { Link } from '@inertiajs/react';
import { Maintenance } from '@/types/siprana';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import { ArrowRight } from 'lucide-react';

interface RecentMaintenanceTableProps {
    maintenances?: Maintenance[];
}

export const RecentMaintenanceTable: React.FC<RecentMaintenanceTableProps> = ({
    maintenances = [],
}) => {
    return (
        <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-800">
                    Aktivitas Pemeliharaan Terkini
                </h3>
                <Link
                    href="/maintenances"
                    className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
                >
                    Lihat Semua <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <tr>
                            <th className="py-2.5 px-3">Tanggal</th>
                            <th className="py-2.5 px-3">Aset Sarpras</th>
                            <th className="py-2.5 px-3">Kondisi Akhir</th>
                            <th className="py-2.5 px-3">Tindakan</th>
                            <th className="py-2.5 px-3">Petugas Pelaksana</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {maintenances.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-slate-400">
                                    Belum ada catatan pemeliharaan terkini.
                                </td>
                            </tr>
                        ) : (
                            maintenances.map((m) => (
                                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-2.5 px-3 text-slate-600">{m.maintenance_date}</td>
                                    <td className="py-2.5 px-3 font-medium text-slate-800">
                                        {m.inventory?.name ?? '-'}
                                    </td>
                                    <td className="py-2.5 px-3">
                                        <Badge condition={m.condition_after} />
                                    </td>
                                    <td className="py-2.5 px-3 text-slate-700 max-w-xs truncate">
                                        {m.action_description}
                                    </td>
                                    <td className="py-2.5 px-3 text-slate-600">
                                        {m.user?.name ?? '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};