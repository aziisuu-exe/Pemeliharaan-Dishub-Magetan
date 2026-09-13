import React from 'react';
import { Category, Location } from '@/types/siprana';

import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/Components/ui/Input';
import { Select } from '@/Components/ui/Select';
import { Button } from '@/Components/ui/Button';

interface InventoryFilterProps {
    search: string;
    onSearchChange: (val: string) => void;
    categoryId: string;
    onCategoryChange: (val: string) => void;
    locationId: string;
    onLocationChange: (val: string) => void;
    condition: string;
    onConditionChange: (val: string) => void;
    categories: Category[];
    locations: Location[];
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
}

export const InventoryFilter: React.FC<InventoryFilterProps> = ({
    search,
    onSearchChange,
    categoryId,
    onCategoryChange,
    locationId,
    onLocationChange,
    condition,
    onConditionChange,
    categories,
    locations,
    onSubmit,
    onReset,
}) => {
    return (
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            <Input
                placeholder="Cari nama / kode..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <Select value={categoryId} onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="">Semua Kategori</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </Select>
            <Select value={locationId} onChange={(e) => onLocationChange(e.target.value)}>
                <option value="">Semua Lokasi</option>
                {locations.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                ))}
            </Select>
            <Select value={condition} onChange={(e) => onConditionChange(e.target.value)}>
                <option value="">Semua Kondisi</option>
                <option value="good">Baik</option>
                <option value="light_damage">Rusak Ringan</option>
                <option value="heavy_damage">Rusak Berat</option>
            </Select>
            <div className="flex gap-1.5">
                <Button type="submit" variant="secondary" className="flex-1">
                    <Search className="w-3.5 h-3.5 mr-1" /> Filter
                </Button>
                <Button type="button" variant="outline" onClick={onReset} className="px-2.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                </Button>
            </div>
        </form>
    );
};