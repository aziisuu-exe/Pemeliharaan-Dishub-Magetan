import React from 'react';
import { Link } from '@inertiajs/react';

import { InventoryShowProps } from '@/features/inventory/types';
import { Maintenance } from '@/types/siprana';
import { ArrowLeft, MapPin, Tag, Calendar, Layers } from 'lucide-react';
import { Column, DataTable } from '@/Components/table/DataTable';
import { AppLayout } from '@/Layouts/AppLayout';
import { Badge } from '@/Components/ui/Badge';
import { Card } from '@/Components/ui/Card';

export default function Show({ inventory }: InventoryShowProps) {
    const item = inventory.data;

    const maintenanceColumns: Column<Maintenance>[] = [
        { header: 'Tanggal', accessorKey: 'maintenance_date' },
        { header: 'Kondisi Awal', cell: (m) => <Badge condition={m.condition_before} /> },
        { header: 'Kondisi Akhir', cell: (m) => <Badge condition={m.condition_after} /> },
        { header: 'Tindakan Perbaikan', accessorKey: 'action_description' },
        {
            header: 'Biaya',
            cell: (m) => <span>Rp {m.cost ? m.cost.toLocaleString('id-ID') : '0'}</span>,
        },
        { header: 'Petugas Pelaksana', accessorKey: 'officer_name' },
    ];

    return (
        <AppLayout title={`Detail Inventaris - ${item.name}`}>
            <div className="space-y-5">
                <div className="flex items-center space-x-3">
                    <Link
                        href={route('inventories.index')}
                        className="p-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h2 className="text-xl font-bold text-slate-800">{item.name}</h2>
                            <Badge condition={item.condition} />
                        </div>
                        <p className="text-xs text-slate-500 font-mono">Kode Aset: {item.code}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded bg-blue-50 border border-blue-100 text-blue-600">
                                <Tag className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] text-slate-400">Kategori</p>
                                <p className="text-sm font-semibold text-slate-800">{item.category?.name ?? '-'}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-600">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] text-slate-400">Lokasi Penempatan</p>
                                <p className="text-sm font-semibold text-slate-800">{item.location?.name ?? '-'}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-600">
                                <Layers className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] text-slate-400">Kuantitas</p>
                                <p className="text-sm font-semibold text-slate-800">{item.quantity} {item.unit}</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-600">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[11px] text-slate-400">Tahun Perolehan</p>
                                <p className="text-sm font-semibold text-slate-800">{item.procurement_year ?? '-'}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card title="Spesifikasi Teknis">
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                        {item.specification || 'Tidak ada catatan spesifikasi khusus untuk aset ini.'}
                    </p>
                </Card>

                <Card title="Riwayat Pemeliharaan & Tindakan">
                    <DataTable
                        columns={maintenanceColumns}
                        data={item.maintenances ?? []}
                        emptyMessage="Belum ada riwayat pemeliharaan untuk aset ini."
                    />
                </Card>
            </div>
        </AppLayout>
    );
}