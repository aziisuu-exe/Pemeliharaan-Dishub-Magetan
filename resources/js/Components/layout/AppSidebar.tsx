import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Layers, 
    MapPin, 
    Package, 
    Wrench,
    History, 
    FileText 
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { DishubLogo } from '../ui/DishubLogo';

interface AppSidebarProps {
    isOpen: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen }) => {
    const { url } = usePage();

    const navItems = [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, active: url.startsWith('/dashboard') },
        { title: 'Kategori', href: '/categories', icon: Layers, active: url.startsWith('/categories') },
        { title: 'Lokasi', href: '/locations', icon: MapPin, active: url.startsWith('/locations') },
        { title: 'Inventaris', href: '/inventories', icon: Package, active: url.startsWith('/inventories') },
        { title: 'Pemeliharaan', href: '/maintenances', icon: Wrench, active: url.startsWith('/maintenances') },
        { title: 'Riwayat', href: '/history', icon: History, active: url.startsWith('/history') },
        { title: 'Laporan', href: '/reports', icon: FileText, active: url.startsWith('/reports') },
    ];

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 bg-[#141b46] border-r border-[#1e2760] transition-transform md:translate-x-0 flex flex-col",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
            <div className="h-16 flex items-center px-5 border-b border-[#1e2760] bg-[#10163b]">
                <div className="flex items-center space-x-3">
                    <DishubLogo className="w-8 h-8 flex-shrink-0" />
                    <div>
                        <h1 className="text-sm font-bold text-white tracking-wide leading-none">SiPrana</h1>
                        <span className="text-[10px] font-semibold text-[#f7b700] tracking-wider leading-none">DISHUB MAGETAN</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2.5 text-xs font-medium rounded-md transition-colors cursor-pointer",
                                item.active
                                    ? "bg-[#212c70] text-[#f7b700] border-l-4 border-[#f7b700] font-semibold"
                                    : "text-slate-300 hover:bg-[#1b2359] hover:text-white"
                            )}
                        >
                            <Icon className={cn("w-4 h-4 mr-3 flex-shrink-0", item.active ? "text-[#f7b700]" : "text-slate-400")} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[#1e2760] bg-[#10163b]">
                <div className="text-[10px] text-slate-400 font-medium leading-relaxed">
                    Dinas Perhubungan Kab. Magetan<br />
                    <span className="text-[#f7b700]">SiPrana v1.0</span>
                </div>
            </div>
        </aside>
    );
};