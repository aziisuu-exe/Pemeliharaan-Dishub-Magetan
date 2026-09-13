import React from 'react';
import { router, usePage } from '@inertiajs/react';
import { LogOut, Menu } from 'lucide-react';

import { PageProps } from '@/types';
import { DishubLogo } from '../ui/DishubLogo';

interface AppHeaderProps {
    title: string;
    onToggleSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, onToggleSidebar }) => {
    const { auth } = usePage<PageProps>().props;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center space-x-3">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-base font-semibold text-slate-800 tracking-tight">
                    {title}
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-xs font-semibold text-slate-800 leading-tight">
                            Administrator
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight font-mono">
                            {auth.user.email}
                        </div>
                    </div>
                    <div className="w-9 h-9 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center p-1">
                        <DishubLogo className="w-full h-full object-contain" />
                    </div>
                </div>

                <div className="h-6 w-px bg-slate-200" />

                <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-rose-600 border border-rose-200 rounded-md hover:bg-rose-50 transition-colors"
                >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" />
                    Keluar
                </button>
            </div>
        </header>
    );
};