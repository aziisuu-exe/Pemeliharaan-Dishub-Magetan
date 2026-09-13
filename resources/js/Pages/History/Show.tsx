import React from 'react';
import { Link } from '@inertiajs/react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Card } from '@/Components/ui/Card';
import { Badge } from '@/Components/ui/Badge';
import { HistoryTimeline } from '@/features/history/components/HistoryTimeline';
import { HistoryShowProps } from '@/features/history/types';
import { ArrowLeft } from 'lucide-react';

export default function Show({ inventory }: HistoryShowProps) {
    return (
        <AppLayout title={`Riwayat - ${inventory.name}`}>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Kronologi Pemeliharaan</h2>
                        <p className="text-xs text-slate-500">Rekam jejak tindakan perbaikan pada sarana prasarana.</p>
                    </div>
                    <Link
                        href="/history"
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Kembali
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="h-fit space-y-3">
                        <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-200 pb-2">Informasi Aset</h3>
                        <div className="space-y-2 text-xs">
                            <div>
                                <span className="text-slate-400 block">Kode Barang</span>
                                <span className="font-mono font-semibold text-slate-800">{inventory.code}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Nama Sarpras</span>
                                <span className="font-medium text-slate-800">{inventory.name}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Kategori</span>
                                <span className="text-slate-800">{inventory.category?.name ?? '-'}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block">Lokasi Penempatan</span>
                                <span className="text-slate-800">{inventory.location?.name ?? '-'}</span>
                            </div>
                            <div>
                                <span className="text-slate-400 block mb-1">Kondisi Terkini</span>
                                <Badge condition={inventory.condition} />
                            </div>
                        </div>
                    </Card>

                    <Card className="md:col-span-2">
                        <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                            Daftar Tindakan Perbaikan
                        </h3>
                        <HistoryTimeline maintenances={inventory.maintenances ?? []} />
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}