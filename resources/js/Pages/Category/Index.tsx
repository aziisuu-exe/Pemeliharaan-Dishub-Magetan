import React, { useState } from 'react';
import { router } from '@inertiajs/react';

import { CategoryFormModal } from '@/features/category/components/CategoryFormModal';
import { Category } from '@/types/siprana';
import { CategoryPageProps } from '@/features/category/types';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Column, DataTable } from '@/Components/table/DataTable';
import { AppLayout } from '@/Layouts/AppLayout';
import { Button } from '@/Components/ui/Button';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Pagination } from '@/Components/table/Pagination';
import { ConfirmDialog } from '@/Components/modal/ConfirmDialog';

export default function Index({ categories, filters }: CategoryPageProps) {
    const [search, setSearch] = useState(filters?.search ?? '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const categoryList = categories?.data ?? [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/categories', { search }, { preserveState: true });
    };

    const handleDelete = () => {
        if (!categoryToDelete) return;
        setIsDeleting(true);
        router.delete(`/categories/${categoryToDelete.id}`, {
            onSuccess: () => {
                setCategoryToDelete(null);
                setIsDeleting(false);
            },
            onError: () => setIsDeleting(false),
        });
    };

    const columns: Column<Category>[] = [
        { header: 'Nama Kategori', accessorKey: 'name', className: 'font-medium text-slate-800' },
        { header: 'Deskripsi', accessorKey: 'description' },
        {
            header: 'Jumlah Aset',
            className: 'w-32 text-center',
            cell: (cat) => <span>{cat.inventories_count ?? 0} Unit</span>,
        },
        {
            header: 'Aksi',
            className: 'w-24 text-right',
            cell: (cat) => (
                <div className="flex items-center justify-end space-x-1">
                    <button
                        type="button"
                        onClick={() => { setSelectedCategory(cat); setIsFormOpen(true); }}
                        className="p-1 text-slate-600 hover:text-blue-600 rounded"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setCategoryToDelete(cat)}
                        className="p-1 text-slate-600 hover:text-red-600 rounded"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout title="Kategori">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Kategori Inventaris</h2>
                        <p className="text-xs text-slate-500">Daftar klasifikasi sarana dan prasarana perhubungan.</p>
                    </div>
                    <Button onClick={() => { setSelectedCategory(null); setIsFormOpen(true); }}>
                        <Plus className="w-4 h-4 mr-1.5" /> Tambah Kategori
                    </Button>
                </div>

                <Card>
                    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <Input
                            placeholder="Cari kategori..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-xs"
                        />
                        <Button type="submit" variant="secondary">
                            <Search className="w-4 h-4 mr-1" /> Cari
                        </Button>
                    </form>

                    <DataTable columns={columns} data={categoryList} emptyMessage="Belum ada data kategori." />
                    <Pagination
                        links={(categories as any)?.meta?.links ?? (categories as any)?.links}
                        from={(categories as any)?.meta?.from ?? categories?.from}
                        to={(categories as any)?.meta?.to ?? categories?.to}
                        total={(categories as any)?.meta?.total ?? categories?.total}
                    />
                </Card>
            </div>

            <CategoryFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                category={selectedCategory}
            />

            <ConfirmDialog
                isOpen={!!categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                onConfirm={handleDelete}
                title="Hapus Kategori"
                description={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"?`}
                isLoading={isDeleting}
            />
        </AppLayout>
    );
}