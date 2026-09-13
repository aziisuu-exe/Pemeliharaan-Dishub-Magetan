import { Maintenance } from '@/types/siprana';

export interface DashboardSummary {
    total_inventories: number;
    total_maintenances: number;
    conditions: {
        good: number;
        light_damage: number;
        heavy_damage: number;
    };
    recent_maintenances: Maintenance[];
}

export interface DashboardPageProps {
    summary: DashboardSummary;
}