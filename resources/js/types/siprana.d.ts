export type ItemConditionType = 'good' | 'light_damage' | 'heavy_damage';

export interface Category {
    id: number;
    name: string;
    description: string | null;
    inventories_count?: number;
    created_at?: string;
}

export interface Location {
    id: number;
    name: string;
    address: string | null;
    coordinate: string | null;
    inventories_count?: number;
    created_at?: string;
}

export interface Inventory {
    id: number;
    category_id: number;
    location_id: number;
    code: string;
    name: string;
    condition: ItemConditionType;
    condition_label: string;
    quantity: number;
    unit: string;
    procurement_year: number | null;
    specification: string | null;
    category?: Category;
    location?: Location;
    maintenances?: Maintenance[];
    created_at?: string;
}

export interface Maintenance {
    id: number;
    inventory_id: number;
    user_id: number;
    maintenance_date: string;
    condition_before: ItemConditionType;
    condition_before_label: string;
    condition_after: ItemConditionType;
    condition_after_label: string;
    action_description: string;
    cost: number;
    officer_name: string;
    inventory?: Inventory;
    user_name?: string;
    created_at?: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
}