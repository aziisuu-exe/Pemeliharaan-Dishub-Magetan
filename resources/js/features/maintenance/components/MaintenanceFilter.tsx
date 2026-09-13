import React from 'react';

import { Search, RotateCcw } from 'lucide-react';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';

interface MaintenanceFilterProps {
    search: string;
    onSearchChange: (val: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
}

export const MaintenanceFilter: React.FC<MaintenanceFilterProps> = ({
    search,
    onSearchChange,
    onSubmit,
    onReset,
}) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input
                placeholder="Cari nomor aset / nama petugas / tindakan..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="max-w-md"
            />
            <div className="flex gap-1.5">
                <Button type="submit" variant="secondary">
                    <Search className="w-3.5 h-3.5 mr-1" /> Cari
                </Button>
                <Button type="button" variant="outline" onClick={onReset} className="px-2.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                </Button>
            </div>
        </form>
    );
};