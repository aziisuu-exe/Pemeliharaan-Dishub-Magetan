import { Category, PaginatedResponse } from '@/types/siprana';

export interface CategoryPageProps {
    categories: PaginatedResponse<Category>;
    filters: {
        search?: string;
    };
}

export interface CategoryFormData {
    name: string;
    description: string;
}