import { Category, Inventory, Location, Maintenance } from '@/types/siprana';

export interface ReportIndexProps {
    categories: Category[];
    locations: Location[];
    inventories?: Inventory[];
}

export interface InventoryReportPrintProps {
    inventories: {
        data: Inventory[];
    };
    filters: {
        category_id?: string;
        location_id?: string;
        condition?: string;
    };
}

export interface MaintenanceReportPrintProps {
    maintenances: {
        data: Maintenance[];
    };
    filters: {
        start_date?: string;
        end_date?: string;
        inventory_id?: string;
    };
}