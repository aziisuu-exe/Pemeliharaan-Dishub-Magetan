<?php

namespace App\Features\Maintenance\Repositories;

use App\Features\Maintenance\Models\Maintenance;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MaintenanceRepository
{
    public function paginate(
        int $perPage = 10,
        ?string $search = null,
        ?int $inventoryId = null
    ): LengthAwarePaginator {
        return Maintenance::query()
            ->with(['inventory.category', 'inventory.location', 'user'])
            ->when($search, function ($q) use ($search) {
                $q->whereHas('inventory', fn ($sub) => $sub->where('name', 'like', "%{$search}%")->orWhere('code', 'like', "%{$search}%"))
                    ->orWhere('officer_name', 'like', "%{$search}%");
            })
            ->when($inventoryId, fn ($q) => $q->where('inventory_id', $inventoryId))
            ->latest('maintenance_date')
            ->latest('id')
            ->paginate($perPage);
    }

    public function findById(int $id): ?Maintenance
    {
        return Maintenance::with(['inventory', 'user'])->find($id);
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