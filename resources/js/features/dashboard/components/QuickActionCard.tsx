import React from 'react';
import { Link } from '@inertiajs/react';
import { Card } from '@/Components/ui/Card';
import { PlusCircle, Wrench, Printer, MapPin } from 'lucide-react';

export const QuickActionCard: React.FC = () => {
    return (
        <Card className="p-5 flex flex-col justify-between">
            <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-4">
                    Aksi Cepat & Layanan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <Link
                        href="/inventories"
                        className="flex items-center p-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                        <PlusCircle className="w-4 h-4 mr-2 text-blue-600" />
                        <span>Inventaris Baru</span>
                    </Link>

                    <Link
                        href="/maintenances"
                        className="flex items-center p-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                        <Wrench className="w-4 h-4 mr-2 text-slate-600" />
                        <span>Catat Servis</span>
                    </Link>

                    <Link
                        href="/reports"
                        className="flex items-center p-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                        <Printer className="w-4 h-4 mr-2 text-slate-600" />
                        <span>Cetak Rekap</span>
                    </Link>

                    <Link
                        href="/locations"
                        className="flex items-center p-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                        <MapPin className="w-4 h-4 mr-2 text-slate-600" />
                        <span>Data Titik Lokasi</span>
                    </Link>
                </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50/60 border border-blue-100 rounded-md">
                <span className="block text-xs font-bold text-blue-900 mb-0.5">
                    Posko Dishub Kabupaten Magetan
                </span>
                <span className="text-[11px] text-blue-700 leading-relaxed block">
                    Jl. Raya Maospati Magetan KM.3, Tinap, Kecamatan Sukomoro | Telp: (0351) 866815
                </span>
            </div>
        </Card>
    );
};