import { Maintenance } from '@/types/siprana';

export interface ConditionDistribution {
    good: number;
    light_damage: number;
    heavy_damage: number;
    good_pct: number;
    light_damage_pct: number;
    heavy_damage_pct: number;
}

export interface DashboardSummary {
    total_inventories: number;
    total_maintenances: number;
    good_condition: number;
    repair_needed: number;
    condition_distribution: ConditionDistribution;
    recent_maintenances: Maintenance[];
}

export interface DashboardPageProps {
    summary: DashboardSummary;
}