import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Card } from '@/Components/ui/Card';
import { DataTable, Column } from '@/Components/table/DataTable';
import { Pagination } from '@/Components/table/Pagination';
import { Badge } from '@/Components/ui/Badge';
import { Button } from '@/Components/ui/Button';
import { HistoryIndexProps } from '@/features/history/types';
import { Inventory } from '@/types/siprana';
import { Search, RotateCcw, ArrowRight } from 'lucide-react';

export default function Index({ inventories, filters }: HistoryIndexProps) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/history', { search }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        router.get('/history');
    };

    const columns: Column<Inventory & { maintenances_count?: number }>[] = [
        {
            header: 'Kode Aset',
            accessorKey: 'code',
            className: 'w-36 font-mono text-slate-700',
        },
        {
            header: 'Nama Sarana Prasarana',
            cell: (item) => (
                <div>
                    <span className="font-semibold text-slate-800 block">{item.name}</span>
                    <span className="text-xs text-slate-400">{item.category?.name ?? '-'}</span>
                </div>
            ),
        },
        {
            header: 'Lokasi',
            cell: (item) => <span>{item.location?.name ?? '-'}</span>,
        },
        {
            header: 'Kondisi Terkini',
            className: 'w-32',
            cell: (item) => <Badge condition={item.condition} />,
        },
        {
            header: 'Total Pemeliharaan',
            className: 'w-36 text-center',
            cell: (item) => (
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    {item.maintenances_count ?? 0} Kali
                </span>
            ),
        },
        {
            header: 'Aksi',
            className: 'w-24 text-right',
            cell: (item) => (
                <Link
                    href={`/history/${item.id}`}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 rounded-md border border-blue-200 hover:border-blue-400"
                >
                    Detail <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
            ),
        },
    ];

    return (
        <AppLayout title="Riwayat Pemeliharaan">
            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Riwayat Pemeliharaan Aset</h2>
                    <p className="text-xs text-slate-500">Daftar sarana dan prasarana yang memiliki catatan historis pemeliharaan.</p>
                </div>

                <Card>
                    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Cari kode atau nama aset..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:w-80 text-sm rounded-md border border-slate-300 px-3 py-1.5 focus:outline-none focus:border-blue-600"
                        />
                        <Button type="submit">
                            <Search className="w-4 h-4 mr-1" /> Cari
                        </Button>
                        <Button variant="secondary" type="button" onClick={handleReset}>
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                    </form>

                    <DataTable columns={columns} data={inventories.data} emptyMessage="Tidak ada riwayat pemeliharaan ditemukan." />
                    <Pagination
                        links={inventories.links ?? inventories.meta?.links}
                        from={inventories.from ?? inventories.meta?.from}
                        to={inventories.to ?? inventories.meta?.to}
                        total={inventories.total ?? inventories.meta?.total}
                    />
                </Card>
            </div>
        </AppLayout>
    );
}