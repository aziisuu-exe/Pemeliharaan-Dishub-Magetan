import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import { Category } from '@/types/siprana';
import { CategoryFormData } from '../types';
import { Modal } from '@/Components/modal/Modal';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
    isOpen,
    onClose,
    category,
}) => {
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm<CategoryFormData>({
            name: '',
            description: '',
        });

    useEffect(() => {
        if (category) {
            setData({
                name: category.name,
                description: category.description ?? '',
            });
        } else {
            reset();
        }
        clearErrors();
    }, [category, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category) {
            put(`/categories/${category.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/categories', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={category ? 'Ubah Kategori Inventaris' : 'Tambah Kategori Inventaris'}
            maxWidth="md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    id="name"
                    label="Nama Kategori"
                    placeholder="Contoh: Rambu Lalu Lintas"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    required
                />
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                        Deskripsi
                    </label>
                    <textarea
                        id="description"
                        rows={3}
                        className="w-full text-sm rounded-md border border-slate-300 p-2.5 bg-white text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="Deskripsi singkat jenis sarpras..."
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && (
                        <p className="text-xs text-red-600 mt-1">{errors.description}</p>
                    )}
                </div>
                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                    <Button variant="secondary" type="button" onClick={onClose} disabled={processing}>
                        Batal
                    </Button>
                    <Button type="submit" isLoading={processing}>
                        {category ? 'Simpan Perubahan' : 'Tambah Kategori'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};