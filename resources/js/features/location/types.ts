import { Location, PaginatedResponse } from '@/types/siprana';

export interface LocationPageProps {
    locations: PaginatedResponse<Location>;
    filters: {
        search?: string;
    };
}

export interface LocationFormData {
    name: string;
    address: string;
    coordinate: string;
}