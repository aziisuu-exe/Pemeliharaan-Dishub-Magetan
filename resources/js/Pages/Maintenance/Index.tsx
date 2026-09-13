import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { MaintenanceFilter } from '@/features/maintenance/components/MaintenanceFilter';
import { MaintenanceFormModal } from '@/features/maintenance/components/MaintenanceFormModal';
import { Maintenance } from '@/types/siprana';
import { MaintenancePageProps } from '@/features/maintenance/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Column, DataTable } from '@/Components/table/DataTable';
import { Badge } from '@/Components/ui/Badge';
import { AppLayout } from '@/Layouts/AppLayout';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Pagination } from '@/Components/table/Pagination';
import { ConfirmDialog } from '@/Components/modal/ConfirmDialog';

export default function Index({ maintenances, inventories = [], filters }: MaintenancePageProps) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Maintenance | null>(null);
    const [itemToDelete, setItemToDelete] = useState<Maintenance | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const maintenanceList = maintenances?.data ?? [];

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/maintenances', { search }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        router.get('/maintenances');
    };

    const handleDelete = () => {
        if (!itemToDelete) return;
        setIsDeleting(true);
        router.delete(`/maintenances/${itemToDelete.id}`, {
            onSuccess: () => { setItemToDelete(null); setIsDeleting(false); },
            onError: () => setIsDeleting(false),
        });
    };

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
            header: 'Kondisi Awal',
            className: 'w-28',
            cell: (m) => <Badge condition={m.condition_before} />,
        },
        {
            header: 'Kondisi Akhir',
            className: 'w-28',
            cell: (m) => <Badge condition={m.condition_after} />,
        },
        { header: 'Tindakan', accessorKey: 'action_description' },
        { header: 'Petugas', accessorKey: 'officer_name', className: 'w-36 text-slate-600' },
        {
            header: 'Aksi',
            className: 'w-20 text-right',
            cell: (item) => (
                <div className="flex items-center justify-end space-x-1">
                    <button
                        type="button"
                        onClick={() => { setSelectedItem(item); setIsFormOpen(true); }}
                        className="p-1 text-slate-600 hover:text-blue-600 rounded"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setItemToDelete(item)}
                        className="p-1 text-slate-600 hover:text-red-600 rounded"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout title="Pemeliharaan">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Riwayat Pemeliharaan</h2>
                        <p className="text-xs text-slate-500">Pencatatan perbaikan dan pemeliharaan perlengkapan jalan Dishub Magetan.</p>
                    </div>
                    <Button onClick={() => { setSelectedItem(null); setIsFormOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1.5" /> Catat Pemeliharaan
                    </Button>
                </div>

                <Card>
                    <MaintenanceFilter
                        search={search}
                        onSearchChange={setSearch}
                        onSubmit={handleFilterSubmit}
                        onReset={handleReset}
                    />
                    <DataTable columns={columns} data={maintenanceList} emptyMessage="Belum ada riwayat pemeliharaan tercatat." />
                    <Pagination
                        links={(maintenances as any)?.meta?.links ?? (maintenances as any)?.links}
                        from={(maintenances as any)?.meta?.from ?? maintenances?.from}
                        to={(maintenances as any)?.meta?.to ?? maintenances?.to}
                        total={(maintenances as any)?.meta?.total ?? maintenances?.total}
                    />
                </Card>
            </div>

            <MaintenanceFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                maintenance={selectedItem}
                inventories={inventories}
            />

            <ConfirmDialog
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleDelete}
                title="Hapus Riwayat Pemeliharaan"
                description="Apakah Anda yakin ingin menghapus catatan pemeliharaan ini?"
                isLoading={isDeleting}
            />
        </AppLayout>
    );
}