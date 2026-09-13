import React, { useState } from 'react';

import { Printer } from 'lucide-react';
import { Card } from '@/Components/ui/Card';
import { Input } from '@/Components/ui/Input';
import { Button } from '@/Components/ui/Button';

export const MaintenanceReportForm: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handlePrint = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        window.open(`${route('reports.maintenance')}?${params.toString()}`, '_blank');
    };

    return (
        <Card title="Rekapitulasi Pemeliharaan Sarpras">
            <form onSubmit={handlePrint} className="space-y-3">
                <Input
                    type="date"
                    label="Mulai Tanggal"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                    type="date"
                    label="Sampai Tanggal"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <div className="pt-2 border-t border-slate-200">
                    <Button type="submit" className="w-full">
                        <Printer className="w-4 h-4 mr-2" /> Buka Laporan Cetak
                    </Button>
                </div>
            </form>
        </Card>
    );
};