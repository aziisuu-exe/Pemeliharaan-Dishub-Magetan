import React from 'react';
import { Link } from '@inertiajs/react';
import { PaginationLink } from '@/types/siprana';
import { cn } from '@/utils/cn';

interface PaginationProps {
    links?: PaginationLink[] | { url: string | null; label: string; active: boolean }[];
    metaLinks?: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total?: number;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
    links,
    metaLinks,
    from,
    to,
    total,
    className,
}) => {
    const rawLinks = Array.isArray(metaLinks) ? metaLinks : Array.isArray(links) ? links : [];

    if (rawLinks.length <= 3) return null;

    return (
        <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 py-3", className)}>
            <p className="text-xs text-slate-500">
                Menampilkan <span className="font-medium text-slate-700">{from ?? 0}</span> sampai{' '}
                <span className="font-medium text-slate-700">{to ?? 0}</span> dari{' '}
                <span className="font-medium text-slate-700">{total ?? 0}</span> data
            </p>
            <div className="flex items-center space-x-1">
                {rawLinks.map((link, idx) => {
                    const cleanLabel = link.label
                        .replace('&laquo;', '‹')
                        .replace('&raquo;', '›');

                    if (!link.url) {
                        return (
                            <span
                                key={idx}
                                className="px-2.5 py-1 text-xs text-slate-400 border border-slate-200 rounded-md bg-slate-50 cursor-not-allowed"
                            >
                                {cleanLabel}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={link.url}
                            className={cn(
                                "px-2.5 py-1 text-xs rounded-md border transition-colors",
                                link.active
                                    ? "bg-blue-600 text-white border-blue-600 font-medium"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            )}
                        >
                            {cleanLabel}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};