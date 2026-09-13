import React, { useState } from 'react';

import { Category, Location } from '@/types/siprana';
import { Printer } from 'lucide-react';
import { Card } from '@/Components/ui/Card';
import { Select } from '@/Components/ui/Select';
import { Button } from '@/Components/ui/Button';

interface InventoryReportFormProps {
    categories: Category[];
    locations: Location[];
}

export const InventoryReportForm: React.FC<InventoryReportFormProps> = ({ categories, locations }) => {
    const [categoryId, setCategoryId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [condition, setCondition] = useState('');

    const handlePrint = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (categoryId) params.append('category_id', categoryId);
        if (locationId) params.append('location_id', locationId);
        if (condition) params.append('condition', condition);
        window.open(`${route('reports.inventory')}?${params.toString()}`, '_blank');
    };

    return (
        <Card title="Rekapitulasi Inventaris Sarana Prasarana">
            <form onSubmit={handlePrint} className="space-y-3">
                <Select
                    label="Kategori Aset"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Semua Kategori</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </Select>
                <Select
                    label="Lokasi Penempatan"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                >
                    <option value="">Semua Lokasi</option>
                    {locations.map((l) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </Select>
                <Select
                    label="Kondisi Fisik"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >
                    <option value="">Semua Kondisi</option>
                    <option value="good">Baik</option>
                    <option value="light_damage">Rusak Ringan</option>
                    <option value="heavy_damage">Rusak Berat</option>
                </Select>
                <div className="pt-2 border-t border-slate-200">
                    <Button type="submit" className="w-full">
                        <Printer className="w-4 h-4 mr-2" /> Buka Laporan Cetak
                    </Button>
                </div>
            </form>
        </Card>
    );
};