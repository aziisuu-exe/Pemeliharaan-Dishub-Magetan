import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import { Location } from '@/types/siprana';
import { LocationFormData } from '../types';
import { Modal } from '@/Components/modal/Modal';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';

interface LocationFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    location: Location | null;
}

export const LocationFormModal: React.FC<LocationFormModalProps> = ({
    isOpen,
    onClose,
    location,
}) => {
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm<LocationFormData>({
            name: '',
            address: '',
            coordinate: '',
        });

    useEffect(() => {
        if (location) {
            setData({
                name: location.name,
                address: location.address ?? '',
                coordinate: location.coordinate ?? '',
            });
        } else {
            reset();
        }
        clearErrors();
    }, [location, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (location) {
            put(route('locations.update', location.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('locations.store'), {
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
            title={location ? 'Ubah Lokasi Penempatan' : 'Tambah Lokasi Penempatan'}
            maxWidth="md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    id="loc_name"
                    label="Nama Lokasi / Titik Ruas"
                    placeholder="Contoh: Simpang Empat Pasar Baru"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    required
                />
                <Input
                    id="loc_address"
                    label="Alamat Lengkap / Wilayah"
                    placeholder="Contoh: Jl. Diponegoro, Kec. Magetan"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    error={errors.address}
                />
                <Input
                    id="loc_coordinate"
                    label="Titik Koordinat (Opsional)"
                    placeholder="Contoh: -7.6534, 111.3281"
                    value={data.coordinate}
                    onChange={(e) => setData('coordinate', e.target.value)}
                    error={errors.coordinate}
                />
                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                    <Button variant="secondary" type="button" onClick={onClose} disabled={processing}>
                        Batal
                    </Button>
                    <Button type="submit" isLoading={processing}>
                        {location ? 'Simpan Perubahan' : 'Tambah Lokasi'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};