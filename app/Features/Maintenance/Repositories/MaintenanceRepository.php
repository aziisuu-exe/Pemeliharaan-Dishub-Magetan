<?php

namespace App\Features\Maintenance\Repositories;

use App\Features\Maintenance\Models\Maintenance;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MaintenanceRepository
{
    public function paginate(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Maintenance::query()
            ->with(['inventory', 'user'])
            ->when($search, function ($query, $search) {
                $query->whereHas('inventory', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%");
                })->orWhereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->latest('maintenance_date')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Maintenance
    {
        return Maintenance::create($data);
    }

    public function update(Maintenance $maintenance, array $data): bool
    {
        return $maintenance->update($data);
    }

    public function delete(Maintenance $maintenance): bool
    {
        return $maintenance->delete();
    }
}