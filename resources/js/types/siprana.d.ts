export type ItemCondition = 'good' | 'light_damage' | 'heavy_damage';

export interface UserOption {
    id: number;
    name: string;
    email?: string;
}

export interface Category {
    id: number;
    name: string;
    code: string;
    description?: string | null;
    inventories_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Location {
    id: number;
    name: string;
    code: string;
    address?: string | null;
    description?: string | null;
    inventories_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Inventory {
    id: number;
    category_id: number;
    location_id: number;
    code: string;
    name: string;
    condition: ItemCondition;
    condition_label?: string;
    photo?: string | null;
    specification?: string | null;
    category?: Category;
    location?: Location;
    maintenances?: Maintenance[];
    created_at?: string;
    updated_at?: string;
}

export interface Maintenance {
    id: number;
    inventory_id: number;
    user_id?: number | null;
    maintenance_date: string;
    condition_before: ItemCondition | string;
    condition_after: ItemCondition | string;
    condition_before_label?: string;
    condition_after_label?: string;
    action_description: string;
    inventory?: Inventory;
    user?: UserOption;
    created_at?: string;
    updated_at?: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    from?: number;
    to?: number;
    total?: number;
    current_page?: number;
    last_page?: number;
    per_page?: number;
    links?: PaginationLink[];
    meta?: {
        from: number;
        to: number;
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        links: PaginationLink[];
    };
}