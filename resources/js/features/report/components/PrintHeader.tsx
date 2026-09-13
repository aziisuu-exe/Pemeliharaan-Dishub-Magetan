import React from 'react';

interface PrintHeaderProps {
    title: string;
    subtitle?: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="border-b-2 border-slate-900 pb-3 mb-6 text-center">
            <h1 className="text-sm font-bold tracking-wider uppercase text-slate-900">
                Pemerintah Kabupaten Magetan
            </h1>
            <h2 className="text-base font-extrabold uppercase text-slate-900">
                Dinas Perhubungan
            </h2>
            <p className="text-[11px] text-slate-600">
                Jl. Mayjen Sukowati No. 45, Magetan, Jawa Timur | Telp: (0351) 895000
            </p>
            <div className="mt-4 pt-2 border-t border-slate-300">
                <h3 className="text-sm font-bold uppercase underline text-slate-800">{title}</h3>
                {subtitle && <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );
};