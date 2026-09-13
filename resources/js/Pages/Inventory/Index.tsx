import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import { InventoryFilter } from '@/features/inventory/components/InventoryFilter';
import { InventoryFormModal } from '@/features/inventory/components/InventoryFormModal';
import { Inventory } from '@/types/siprana';
import { InventoryPageProps } from '@/features/inventory/types';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import { Column, DataTable } from '@/Components/table/DataTable';
import { Badge } from '@/Components/ui/Badge';
import { AppLayout } from '@/Layouts/AppLayout';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Pagination } from '@/Components/table/Pagination';
import { ConfirmDialog } from '@/Components/modal/ConfirmDialog';

export default function Index({ inventories, categories, locations, filters }: InventoryPageProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [categoryId, setCategoryId] = useState(filters.category_id ?? '');
    const [locationId, setLocationId] = useState(filters.location_id ?? '');
    const [condition, setCondition] = useState(filters.condition ?? '');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);
    const [itemToDelete, setItemToDelete] = useState<Inventory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('inventories.index'), {
            search,
            category_id: categoryId,
            location_id: locationId,
            condition,
        }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch('');
        setCategoryId('');
        setLocationId('');
        setCondition('');
        router.get(route('inventories.index'));
    };

    const handleDelete = () => {
        if (!itemToDelete) return;
        setIsDeleting(true);
        router.delete(route('inventories.destroy', itemToDelete.id), {
            onSuccess: () => { setItemToDelete(null); setIsDeleting(false); },
            onError: () => setIsDeleting(false),
        });
    };

    const columns: Column<Inventory>[] = [
        { header: 'Kode', accessorKey: 'code', className: 'font-mono text-xs font-semibold' },
        { header: 'Nama Sarpras', accessorKey: 'name', className: 'font-medium text-slate-800' },
        { header: 'Kategori', cell: (i) => i.category?.name ?? '-' },
        { header: 'Lokasi', cell: (i) => i.location?.name ?? '-' },
        {
            header: 'Kondisi',
            cell: (i) => <Badge condition={i.condition} />,
        },
        {
            header: 'Jumlah',
            className: 'text-center',
            cell: (i) => <span>{i.quantity} {i.unit}</span>,
        },
        {
            header: 'Aksi',
            className: 'w-28 text-right',
            cell: (item) => (
                <div className="flex items-center justify-end space-x-1">
                    <Link href={route('inventories.show', item.id)} className="p-1 text-slate-600 hover:text-blue-600 rounded">
                        <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => { setSelectedItem(item); setIsFormOpen(true); }} className="p-1 text-slate-600 hover:text-blue-600 rounded">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setItemToDelete(item)} className="p-1 text-slate-600 hover:text-red-600 rounded">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout title="Inventaris">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Inventaris Sarana Prasarana</h2>
                        <p className="text-xs text-slate-500">Pendataan dan pemantauan kondisi fisik perlengkapan jalan Dishub Magetan.</p>
                    </div>
                    <Button onClick={() => { setSelectedItem(null); setIsFormOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1.5" /> Tambah Inventaris
                    </Button>
                </div>

                <Card>
                    <InventoryFilter
                        search={search} onSearchChange={setSearch}
                        categoryId={categoryId} onCategoryChange={setCategoryId}
                        locationId={locationId} onLocationChange={setLocationId}
                        condition={condition} onConditionChange={setCondition}
                        categories={categories} locations={locations}
                        onSubmit={handleFilterSubmit} onReset={handleReset}
                    />

                    <DataTable columns={columns} data={inventories.data} emptyMessage="Tidak ada inventaris yang cocok." />
                    <Pagination links={inventories.links} from={inventories.from} to={inventories.to} total={inventories.total} />
                </Card>
            </div>

            <InventoryFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                inventory={selectedItem}
                categories={categories}
                locations={locations}
            />

            <ConfirmDialog
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleDelete}
                title="Hapus Inventaris"
                description={`Apakah Anda yakin ingin menghapus aset "${itemToDelete?.name}" (${itemToDelete?.code})?`}
                isLoading={isDeleting}
            />
        </AppLayout>
    );
}