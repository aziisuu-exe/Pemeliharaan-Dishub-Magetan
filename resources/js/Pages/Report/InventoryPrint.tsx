import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { PrintHeader } from '@/features/report/components/PrintHeader';
import { InventoryReportPrintProps } from '@/features/report/types';

export default function InventoryPrint({ inventories }: InventoryReportPrintProps) {
    useEffect(() => {
        window.print();
    }, []);

    const items = inventories.data;

    return (
        <div className="min-h-screen bg-white p-8 text-slate-900 font-sans text-xs">
            <Head title="Cetak Rekapitulasi Inventaris Sarpras - Dishub Magetan" />
            <PrintHeader title="Laporan Rekapitulasi Inventaris Sarana dan Prasarana" subtitle={`Dicetak pada: ${new Date().toLocaleDateString('id-ID')}`} />

            <table className="w-full border-collapse border border-slate-400">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border border-slate-400 p-2 text-center w-8">No</th>
                        <th className="border border-slate-400 p-2 text-left">Kode</th>
                        <th className="border border-slate-400 p-2 text-left">Nama Sarpras</th>
                        <th className="border border-slate-400 p-2 text-left">Kategori</th>
                        <th className="border border-slate-400 p-2 text-left">Lokasi</th>
                        <th className="border border-slate-400 p-2 text-center w-16">Kondisi</th>
                        <th className="border border-slate-400 p-2 text-center w-16">Jumlah</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="border border-slate-400 p-4 text-center text-slate-500">
                                Tidak ada data inventaris yang sesuai dengan filter.
                            </td>
                        </tr>
                    ) : (
                        items.map((item, idx) => (
                            <tr key={item.id}>
                                <td className="border border-slate-400 p-2 text-center">{idx + 1}</td>
                                <td className="border border-slate-400 p-2 font-mono">{item.code}</td>
                                <td className="border border-slate-400 p-2 font-medium">{item.name}</td>
                                <td className="border border-slate-400 p-2">{item.category?.name ?? '-'}</td>
                                <td className="border border-slate-400 p-2">{item.location?.name ?? '-'}</td>
                                <td className="border border-slate-400 p-2 text-center capitalize">{item.condition_label}</td>
                                <td className="border border-slate-400 p-2 text-center">{item.quantity} {item.unit}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}