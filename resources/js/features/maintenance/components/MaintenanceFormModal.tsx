import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Inventory, Maintenance } from '@/types/siprana';
import { MaintenanceFormData } from '../types';
import { Modal } from '@/Components/modal/Modal';
import { Select } from '@/Components/ui/Select';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';

interface MaintenanceFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    maintenance: Maintenance | null;
    inventories: Inventory[] | { data: Inventory[] };
}

export const MaintenanceFormModal: React.FC<MaintenanceFormModalProps> = ({
    isOpen,
    onClose,
    maintenance,
    inventories,
}) => {
    const inventoryList = Array.isArray(inventories)
        ? inventories
        : (inventories as { data: Inventory[] })?.data ?? [];

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm<MaintenanceFormData>({
            inventory_id: '',
            maintenance_date: new Date().toISOString().split('T')[0],
            condition_before: 'light_damage',
            condition_after: 'good',
            action_description: '',
            officer_name: '',
        });

    useEffect(() => {
        if (maintenance) {
            setData({
                inventory_id: maintenance.inventory_id,
                maintenance_date: maintenance.maintenance_date,
                condition_before: maintenance.condition_before,
                condition_after: maintenance.condition_after,
                action_description: maintenance.action_description,
                officer_name: maintenance.officer_name,
            });
        } else {
            reset();
        }
        clearErrors();
    }, [maintenance, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (maintenance) {
            put(`/maintenances/${maintenance.id}`, {
                onSuccess: () => { reset(); onClose(); },
            });
        } else {
            post('/maintenances', {
                onSuccess: () => { reset(); onClose(); },
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={maintenance ? 'Ubah Catatan Pemeliharaan' : 'Catat Pemeliharaan Sarpras'}
            maxWidth="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                        id="inventory_id"
                        label="Aset Sarana Prasarana"
                        value={data.inventory_id}
                        onChange={(e) => setData('inventory_id', e.target.value === '' ? '' : Number(e.target.value))}
                        error={errors.inventory_id}
                        required
                    >
                        <option value="">Pilih Aset Sarpras</option>
                        {inventoryList.map((inv) => (
                            <option key={inv.id} value={inv.id}>
                                {inv.code} - {inv.name}
                            </option>
                        ))}
                    </Select>
                    <Input
                        id="maintenance_date"
                        type="date"
                        label="Tanggal Tindakan"
                        value={data.maintenance_date}
                        onChange={(e) => setData('maintenance_date', e.target.value)}
                        error={errors.maintenance_date}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                        id="condition_before"
                        label="Kondisi Sebelum Tindakan"
                        value={data.condition_before}
                        onChange={(e) => setData('condition_before', e.target.value)}
                        error={errors.condition_before}
                        required
                    >
                        <option value="good">Baik</option>
                        <option value="light_damage">Rusak Ringan</option>
                        <option value="heavy_damage">Rusak Berat</option>
                    </Select>
                    <Select
                        id="condition_after"
                        label="Kondisi Sesudah Tindakan"
                        value={data.condition_after}
                        onChange={(e) => setData('condition_after', e.target.value)}
                        error={errors.condition_after}
                        required
                    >
                        <option value="good">Baik</option>
                        <option value="light_damage">Rusak Ringan</option>
                        <option value="heavy_damage">Rusak Berat</option>
                    </Select>
                </div>

                <div>
                    <Input
                        id="officer_name"
                        label="Teknisi / Petugas Pelaksana"
                        placeholder="Nama petugas Dishub"
                        value={data.officer_name}
                        onChange={(e) => setData('officer_name', e.target.value)}
                        error={errors.officer_name}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="action_description" className="block text-sm font-medium text-slate-700 mb-1">
                        Deskripsi Tindakan Perbaikan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="action_description"
                        rows={3}
                        className="w-full text-sm rounded-md border border-slate-300 p-2.5 bg-white text-slate-900 focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="Uraian perbaikan, penggantian modul..."
                        value={data.action_description}
                        onChange={(e) => setData('action_description', e.target.value)}
                        required
                    />
                    {errors.action_description && (
                        <p className="text-xs text-red-600 mt-1">{errors.action_description}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                    <Button variant="secondary" type="button" onClick={onClose} disabled={processing}>
                        Batal
                    </Button>
                    <Button type="submit" isLoading={processing}>
                        {maintenance ? 'Simpan Perubahan' : 'Catat Pemeliharaan'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};