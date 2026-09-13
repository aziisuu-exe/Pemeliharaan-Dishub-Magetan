import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import { Category, Inventory, Location } from '@/types/siprana';
import { InventoryFormData } from '../types';
import { Modal } from '@/Components/modal/Modal';
import { Select } from '@/Components/ui/Select';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';

interface InventoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    inventory: Inventory | null;
    categories: Category[];
    locations: Location[];
}

export const InventoryFormModal: React.FC<InventoryFormModalProps> = ({
    isOpen,
    onClose,
    inventory,
    categories,
    locations,
}) => {
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm<InventoryFormData>({
            category_id: '',
            location_id: '',
            code: '',
            name: '',
            condition: 'good',
            quantity: 1,
            unit: 'unit',
            procurement_year: String(new Date().getFullYear()),
            specification: '',
        });

    useEffect(() => {
        if (inventory) {
            setData({
                category_id: String(inventory.category_id),
                location_id: String(inventory.location_id),
                code: inventory.code,
                name: inventory.name,
                condition: inventory.condition,
                quantity: inventory.quantity,
                unit: inventory.unit,
                procurement_year: inventory.procurement_year ? String(inventory.procurement_year) : '',
                specification: inventory.specification ?? '',
            });
        } else {
            reset();
        }
        clearErrors();
    }, [inventory, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inventory) {
            put(route('inventories.update', inventory.id), {
                onSuccess: () => { reset(); onClose(); },
            });
        } else {
            post(route('inventories.store'), {
                onSuccess: () => { reset(); onClose(); },
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={inventory ? 'Ubah Data Inventaris' : 'Tambah Aset Inventaris Baru'}
            maxWidth="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                        id="category_id"
                        label="Kategori Aset"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        error={errors.category_id}
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </Select>
                    <Select
                        id="location_id"
                        label="Lokasi Penempatan"
                        value={data.location_id}
                        onChange={(e) => setData('location_id', e.target.value)}
                        error={errors.location_id}
                        required
                    >
                        <option value="">Pilih Lokasi</option>
                        {locations.map((l) => (
                            <option key={l.id} value={l.name ? l.id : ''}>{l.name}</option>
                        ))}
                    </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        id="code"
                        label="Kode Registrasi Inventaris"
                        placeholder="Contoh: RMB-MGT-001"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        error={errors.code}
                        required
                    />
                    <Input
                        id="name"
                        label="Nama Sarana Prasarana"
                        placeholder="Contoh: Rambu Peringatan Tikungan"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Select
                        id="condition"
                        label="Kondisi Fisik"
                        value={data.condition}
                        onChange={(e) => setData('condition', e.target.value as any)}
                        error={errors.condition}
                        required
                    >
                        <option value="good">Baik</option>
                        <option value="light_damage">Rusak Ringan</option>
                        <option value="heavy_damage">Rusak Berat</option>
                    </Select>
                    <Input
                        id="quantity"
                        type="number"
                        min="1"
                        label="Jumlah"
                        value={data.quantity}
                        onChange={(e) => setData('quantity', parseInt(e.target.value) || 1)}
                        error={errors.quantity}
                        required
                    />
                    <Input
                        id="unit"
                        label="Satuan Unit"
                        placeholder="Unit/Set/Batang"
                        value={data.unit}
                        onChange={(e) => setData('unit', e.target.value)}
                        error={errors.unit}
                        required
                    />
                </div>

                <Input
                    id="procurement_year"
                    type="number"
                    label="Tahun Perolehan / Pemasangan"
                    placeholder="Contoh: 2025"
                    value={data.procurement_year}
                    onChange={(e) => setData('procurement_year', e.target.value)}
                    error={errors.procurement_year}
                />

                <div>
                    <label htmlFor="specification" className="block text-sm font-medium text-slate-700 mb-1">
                        Spesifikasi Teknis
                    </label>
                    <textarea
                        id="specification"
                        rows={2}
                        className="w-full text-sm rounded-md border border-slate-300 p-2.5 bg-white text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="Bahan, dimensi, dan catatan fisik aset..."
                        value={data.specification}
                        onChange={(e) => setData('specification', e.target.value)}
                    />
                    {errors.specification && (
                        <p className="text-xs text-red-600 mt-1">{errors.specification}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                    <Button variant="secondary" type="button" onClick={onClose} disabled={processing}>
                        Batal
                    </Button>
                    <Button type="submit" isLoading={processing}>
                        {inventory ? 'Simpan Perubahan' : 'Simpan Inventaris'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};