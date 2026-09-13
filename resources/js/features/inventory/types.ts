import { Category, Inventory, ItemConditionType, Location, PaginatedResponse } from '@/types/siprana';

export interface InventoryPageProps {
    inventories: PaginatedResponse<Inventory>;
    categories: Category[];
    locations: Location[];
    filters: {
        search?: string;
        category_id?: string;
        location_id?: string;
        condition?: string;
    };
}

export interface InventoryShowProps {
    inventory: {
        data: Inventory;
    };
}

export interface InventoryFormData {
    category_id: string;
    location_id: string;
    code: string;
    name: string;
    condition: ItemConditionType;
    quantity: number;
    unit: string;
    procurement_year: string;
    specification: string;
}