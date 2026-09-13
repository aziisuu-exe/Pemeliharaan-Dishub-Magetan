import React from 'react';
import { cn } from '@/utils/cn';

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    className?: string;
    cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
    className?: string;
}

export function DataTable<T extends { id: number | string }>({
    columns,
    data,
    emptyMessage = 'Tidak ada data yang tersedia.',
    className,
}: DataTableProps<T>) {
    return (
        <div className={cn("w-full overflow-x-auto border border-slate-200 rounded-md bg-white", className)}>
            <table className="w-full text-left border-collapse text-sm">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={cn("py-3 px-4 text-xs font-semibold text-slate-700 tracking-wider", col.className)}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="py-8 text-center text-slate-500 text-sm">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                {columns.map((col, idx) => (
                                    <td key={idx} className={cn("py-3 px-4 text-slate-700", col.className)}>
                                        {col.cell
                                            ? col.cell(item)
                                            : col.accessorKey
                                            ? String(item[col.accessorKey] ?? '-')
                                            : '-'}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}