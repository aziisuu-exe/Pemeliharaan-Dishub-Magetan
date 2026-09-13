import React from 'react';
import { AppLayout } from '@/Layouts/AppLayout';
import { DashboardPageProps } from '@/features/dashboard/types';
import { DashboardStatCard } from '@/features/dashboard/components/DashboardStatCard';
import { ConditionDistributionCard } from '@/features/dashboard/components/ConditionDistributionCard';
import { QuickActionCard } from '@/features/dashboard/components/QuickActionCard';
import { RecentMaintenanceTable } from '@/features/dashboard/components/RecentMaintenanceTable';
import { Package, Wrench, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Index({ summary }: DashboardPageProps) {
    return (
        <AppLayout title="Dashboard">
            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard SiPrana</h2>
                    <p className="text-xs text-slate-500">
                        Sistem Inventaris dan Pemeliharaan Sarana Prasarana Dinas Perhubungan Kabupaten Magetan.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DashboardStatCard
                        title="TOTAL INVENTARIS"
                        value={`${summary.total_inventories} Unit`}
                        icon={Package}
                        iconColor="text-blue-600"
                        iconBg="bg-blue-50"
                    />
                    <DashboardStatCard
                        title="TOTAL PEMELIHARAAN"
                        value={`${summary.total_maintenances} Kali`}
                        icon={Wrench}
                        iconColor="text-slate-600"
                        iconBg="bg-slate-100"
                    />
                    <DashboardStatCard
                        title="KONDISI BAIK"
                        value={`${summary.good_condition} Unit`}
                        icon={CheckCircle2}
                        iconColor="text-emerald-600"
                        iconBg="bg-emerald-50"
                    />
                    <DashboardStatCard
                        title="PERLU PERBAIKAN"
                        value={`${summary.repair_needed} Unit`}
                        icon={AlertTriangle}
                        iconColor="text-amber-600"
                        iconBg="bg-amber-50"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        <ConditionDistributionCard distribution={summary.condition_distribution} />
                    </div>
                    <div>
                        <QuickActionCard />
                    </div>
                </div>

                <div>
                    <RecentMaintenanceTable maintenances={summary.recent_maintenances} />
                </div>
            </div>
        </AppLayout>
    );
}