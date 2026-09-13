import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';

import { PageProps } from '@/types';
import { AppSidebar } from '@/Components/layout/AppSidebar';
import { AppHeader } from '@/Components/layout/AppHeader';

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, title = 'SiPrana Dishub' }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Head title={`${title} - SiPrana Dishub Magetan`} />
            <Toaster position="top-right" richColors />

            <AppSidebar isOpen={sidebarOpen} />

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-900/40 z-20 md:hidden"
                />
            )}

            <div className="flex-1 flex flex-col md:pl-64 min-w-0">
                <AppHeader
                    title={title}
                    onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                />
                <main className="flex-1 p-4 sm:p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};