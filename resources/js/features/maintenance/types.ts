import { Inventory, Maintenance, UserOption } from '@/types/siprana';

export interface MaintenanceFormData {
    inventory_id: number | '';
    user_id: number | '';
    maintenance_date: string;
    condition_before: string;
    condition_after: string;
    action_description: string;
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
    users: UserOption[];
    filters?: {
        search?: string;
    };
}