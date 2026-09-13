import React, { useState } from 'react';
import { router } from '@inertiajs/react';

import { LocationFormModal } from '@/features/location/components/LocationFormModal';
import { Location } from '@/types/siprana';
import { LocationPageProps } from '@/features/location/types';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Column, DataTable } from '@/Components/table/DataTable';
import { AppLayout } from '@/Layouts/AppLayout';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Pagination } from '@/Components/table/Pagination';
import { ConfirmDialog } from '@/Components/modal/ConfirmDialog';
import { Input } from '@/Components/ui/Input';

export default function Index({ locations, filters }: LocationPageProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('locations.index'), { search }, { preserveState: true });
    };

    const handleDelete = () => {
        if (!locationToDelete) return;
        setIsDeleting(true);
        router.delete(route('locations.destroy', locationToDelete.id), {
            onSuccess: () => {
                setLocationToDelete(null);
                setIsDeleting(false);
            },
            onError: () => setIsDeleting(false),
        });
    };

    const columns: Column<Location>[] = [
        { header: 'Nama Ruas / Titik Lokasi', accessorKey: 'name', className: 'font-medium text-slate-800' },
        { header: 'Alamat / Kecamatan', accessorKey: 'address' },
        { header: 'Koordinat', accessorKey: 'coordinate', className: 'font-mono text-xs' },
        {
            header: 'Aset Tertaut',
            className: 'w-28 text-center',
            cell: (loc) => <span>{loc.inventories_count ?? 0} Unit</span>,
        },
        {
            header: 'Aksi',
            className: 'w-24 text-right',
            cell: (loc) => (
                <div className="flex items-center justify-end space-x-1">
                    <button
                        onClick={() => { setSelectedLocation(loc); setIsFormOpen(true); }}
                        className="p-1 text-slate-600 hover:text-blue-600 rounded"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setLocationToDelete(loc)}
                        className="p-1 text-slate-600 hover:text-red-600 rounded"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout title="Lokasi">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Lokasi Penempatan</h2>
                        <p className="text-xs text-slate-500">Daftar lokasi persebaran aset perlengkapan jalan di Magetan.</p>
                    </div>
                    <Button onClick={() => { setSelectedLocation(null); setIsFormOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1.5" /> Tambah Lokasi
                    </Button>
                </div>

                <Card>
                    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <Input
                            placeholder="Cari lokasi ruas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-xs"
                        />
                        <Button type="submit" variant="secondary">
                            <Search className="w-4 h-4 mr-1" /> Cari
                        </Button>
                    </form>

                    <DataTable columns={columns} data={locations.data} emptyMessage="Belum ada data lokasi." />
                    <Pagination links={locations.links} from={locations.from} to={locations.to} total={locations.total} />
                </Card>
            </div>

            <LocationFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                location={selectedLocation}
            />

            <ConfirmDialog
                isOpen={!!locationToDelete}
                onClose={() => setLocationToDelete(null)}
                onConfirm={handleDelete}
                title="Hapus Lokasi"
                description={`Apakah Anda yakin ingin menghapus lokasi "${locationToDelete?.name}"?`}
                isLoading={isDeleting}
            />
        </AppLayout>
    );
}