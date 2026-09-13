import React from 'react';

import { Link } from '@inertiajs/react';
import { PlusCircle, Wrench, Printer, HelpCircle } from 'lucide-react';
import { Card } from '@/Components/ui/Card';

export const QuickActionCard: React.FC = () => {
    return (
        <Card title="Aksi Cepat & Layanan">
            <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                    href="/inventories"
                    className="flex items-center p-2.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-colors"
                >
                    <PlusCircle className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-medium">Inventaris Baru</span>
                </Link>

                <Link
                    href="/maintenances"
                    className="flex items-center p-2.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-colors"
                >
                    <Wrench className="w-4 h-4 mr-2 text-slate-700 flex-shrink-0" />
                    <span className="text-xs font-medium">Catat Servis</span>
                </Link>

                <Link
                    href="/reports"
                    className="flex items-center p-2.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-colors"
                >
                    <Printer className="w-4 h-4 mr-2 text-slate-700 flex-shrink-0" />
                    <span className="text-xs font-medium">Cetak Rekap</span>
                </Link>

                <Link
                    href="/locations"
                    className="flex items-center p-2.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-colors"
                >
                    <HelpCircle className="w-4 h-4 mr-2 text-slate-700 flex-shrink-0" />
                    <span className="text-xs font-medium">Data Titik Lokasi</span>
                </Link>
            </div>

            <div className="mt-4 p-3 bg-blue-50/60 border border-blue-100 rounded-md">
                <p className="text-[11px] font-semibold text-blue-900">Posko Dishub Kabupaten Magetan</p>
                <p className="text-[11px] text-blue-700 mt-0.5">Jl. Mayjen Sukowati No. 45 | Telp: (0351) 895000</p>
            </div>
        </Card>
    );
};