import React from 'react';

import { ReportIndexProps } from '@/features/report/types';
import { InventoryReportForm } from '@/features/report/components/InventoryReportForm';
import { MaintenanceReportForm } from '@/features/report/components/MaintenanceReportForm';
import { AppLayout } from '@/Layouts/AppLayout';

export default function Index({ categories, locations }: ReportIndexProps) {
    return (
        <AppLayout title="Laporan">
            <div className="space-y-5">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Laporan dan Rekapitulasi Sarpras
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Cetak rekapitulasi inventaris perlengkapan jalan dan riwayat tindakan pemeliharaan Dishub Magetan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InventoryReportForm categories={categories} locations={locations} />
                    <MaintenanceReportForm />
                </div>
            </div>
        </AppLayout>
    );
}