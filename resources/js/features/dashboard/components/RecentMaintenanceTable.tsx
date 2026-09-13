import React from 'react';

import { Maintenance } from '@/types/siprana';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Column, DataTable } from '@/Components/table/DataTable';
import { Badge } from '@/Components/ui/Badge';
import { Card } from '@/Components/ui/Card';

interface RecentMaintenanceTableProps {
    maintenances?: Maintenance[];
}

export const RecentMaintenanceTable: React.FC<RecentMaintenanceTableProps> = ({ maintenances = [] }) => {
    const list = Array.isArray(maintenances) ? maintenances : [];

    const columns: Column<Maintenance>[] = [
        { header: 'Tanggal', accessorKey: 'maintenance_date', className: 'w-28 text-slate-600' },
        {
            header: 'Aset Sarpras',
            cell: (m) => (
                <div>
                    <p className="font-medium text-slate-800">{m.inventory?.name ?? '-'}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{m.inventory?.code ?? '-'}</p>
                </div>
            ),
        },
        {
            header: 'Kondisi Akhir',
            className: 'w-32',
            cell: (m) => <Badge condition={m.condition_after} />,
        },
        { header: 'Tindakan', accessorKey: 'action_description' },
        { header: 'Petugas Pelaksana', accessorKey: 'officer_name', className: 'w-36 text-slate-600' },
    ];

    return (
        <Card
            title="Aktivitas Pemeliharaan Terkini"
            action={
                <Link
                    href="/maintenances"
                    className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                    Lihat Semua <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
            }
        >
            <DataTable
                columns={columns}
                data={list}
                emptyMessage="Belum ada catatan pemeliharaan terkini."
            />
        </Card>
    );
};