import { Inventory, Maintenance } from '@/types/siprana';

export interface MaintenanceFormData {
    inventory_id: number | '';
    maintenance_date: string;
    condition_before: string;
    condition_after: string;
    action_description: string;
    officer_name: string;
}

export interface MaintenancePageProps {
    maintenances: {
        data: Maintenance[];
        from?: number;
        to?: number;
        total?: number;
        links?: any[];
        meta?: {
            from: number;
            to: number;
            total: number;
            links: any[];
        };
    };
    inventories: Inventory[] | { data: Inventory[] };
    filters?: {
        search?: string;
    };
}