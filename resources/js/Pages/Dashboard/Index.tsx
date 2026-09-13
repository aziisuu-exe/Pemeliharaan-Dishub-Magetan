import React from 'react';

import { DashboardPageProps } from '@/features/dashboard/types';
import { ConditionDistributionCard } from '@/features/dashboard/components/ConditionDistributionCard';
import { QuickActionCard } from '@/features/dashboard/components/QuickActionCard';
import { RecentMaintenanceTable } from '@/features/dashboard/components/RecentMaintenanceTable';
import { Package, Wrench, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AppLayout } from '@/Layouts/AppLayout';
import { Card } from '@/Components/ui/Card';

export default function Index({ summary }: DashboardPageProps) {
    const totalInventories = summary?.total_inventories ?? 0;
    const totalMaintenances = summary?.total_maintenances ?? 0;
    const goodCondition = summary?.conditions?.good ?? 0;
    const lightDamage = summary?.conditions?.light_damage ?? 0;
    const heavyDamage = summary?.conditions?.heavy_damage ?? 0;
    const damageCondition = lightDamage + heavyDamage;

    return (
        <AppLayout title="Dashboard">
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        Dashboard SiPrana
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Sistem Inventaris dan Pemeliharaan Sarana Prasarana Dinas Perhubungan Kabupaten Magetan.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Inventaris</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalInventories} Unit</h3>
                            </div>
                            <div className="p-3 rounded-md border border-blue-200 bg-blue-50 text-blue-600">
                                <Package className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Pemeliharaan</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-1">{totalMaintenances} Kali</h3>
                            </div>
                            <div className="p-3 rounded-md border border-slate-200 bg-slate-100 text-slate-700">
                                <Wrench className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Kondisi Baik</p>
                                <h3 className="text-2xl font-bold text-emerald-800 mt-1">{goodCondition} Unit</h3>
                            </div>
                            <div className="p-3 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Perlu Perbaikan</p>
                                <h3 className="text-2xl font-bold text-amber-800 mt-1">{damageCondition} Unit</h3>
                            </div>
                            <div className="p-3 rounded-md border border-amber-200 bg-amber-50 text-amber-600">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2">
                        <ConditionDistributionCard
                            good={goodCondition}
                            lightDamage={lightDamage}
                            heavyDamage={heavyDamage}
                        />
                    </div>
                    <div>
                        <QuickActionCard />
                    </div>
                </div>

                <RecentMaintenanceTable maintenances={summary?.recent_maintenances} />
            </div>
        </AppLayout>
    );
}