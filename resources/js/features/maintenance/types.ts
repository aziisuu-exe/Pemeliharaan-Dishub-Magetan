import { Inventory, ItemConditionType, Maintenance, PaginatedResponse } from '@/types/siprana';

export interface MaintenancePageProps {
    maintenances: PaginatedResponse<Maintenance>;
    inventories?: Inventory[];
    filters: {
        search?: string;
        inventory_id?: string;
    };
}

export interface MaintenanceFormData {
    inventory_id: string;
    maintenance_date: string;
    condition_before: ItemConditionType;
    condition_after: ItemConditionType;
    action_description: string;
    cost: number | '';
    officer_name: string;
}