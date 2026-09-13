import { Inventory, PaginatedData } from '@/types/siprana';

export interface HistoryIndexProps {
    inventories: PaginatedData<Inventory & { maintenances_count?: number }>;
    filters?: {
        search?: string;
    };
}

export interface HistoryShowProps {
    inventory: Inventory;
}