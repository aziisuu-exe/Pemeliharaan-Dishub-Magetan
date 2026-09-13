import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { PrintHeader } from '@/features/report/components/PrintHeader';
import { MaintenanceReportPrintProps } from '@/features/report/types';

export default function MaintenancePrint({ maintenances, filters }: MaintenanceReportPrintProps) {
    useEffect(() => {
        window.print();
    }, []);

    const items = maintenances.data;
    const period = filters.start_date && filters.end_date
        ? `Periode: ${filters.start_date} s/d ${filters.end_date}`
        : `Semua Periode`;

    return (
        <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-xs">
            <Head title="Cetak Rekapitulasi Pemeliharaan - Dishub Magetan" />
            <PrintHeader title="Laporan Rekapitulasi Pemeliharaan Sarpras" subtitle={period} />

            <table className="w-full border-collapse border border-slate-400">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border border-slate-400 p-2 text-center w-8">No</th>
                        <th className="border border-slate-400 p-2 text-left w-24">Tanggal</th>
                        <th className="border border-slate-400 p-2 text-left">Nama Aset Sarpras</th>
                        <th className="border border-slate-400 p-2 text-center">Kondisi Awal / Akhir</th>
                        <th className="border border-slate-400 p-2 text-left">Tindakan</th>
                        <th className="border border-slate-400 p-2 text-right w-24">Biaya</th>
                        <th className="border border-slate-400 p-2 text-left w-32">Petugas</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="border border-slate-400 p-4 text-center text-slate-500">
                                Tidak ada data pemeliharaan pada periode ini.
                            </td>
                        </tr>
                    ) : (
                        items.map((m, idx) => (
                            <tr key={m.id}>
                                <td className="border border-slate-400 p-2 text-center">{idx + 1}</td>
                                <td className="border border-slate-400 p-2">{m.maintenance_date}</td>
                                <td className="border border-slate-400 p-2 font-medium">{m.inventory?.name ?? '-'}</td>
                                <td className="border border-slate-400 p-2 text-center">
                                    {m.condition_before_label} → {m.condition_after_label}
                                </td>
                                <td className="border border-slate-400 p-2">{m.action_description}</td>
                                <td className="border border-slate-400 p-2 text-right">
                                    Rp {Number(m.cost || 0).toLocaleString('id-ID')}
                                </td>
                                <td className="border border-slate-400 p-2">{m.officer_name}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}