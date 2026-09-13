<?php

namespace App\Features\Inventory\Repositories;

use App\Features\Inventory\Models\Inventory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class InventoryRepository
{
    public function paginate(
        int $perPage = 10,
        ?string $search = null,
        ?int $categoryId = null,
        ?int $locationId = null,
        ?string $condition = null
    ): LengthAwarePaginator {
        return Inventory::query()
            ->with(['category', 'location'])
            ->when($search, function ($q) use ($search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%");
                });
            })
            ->when($categoryId, fn ($q) => $q->where('category_id', $categoryId))
            ->when($locationId, fn ($q) => $q->where('location_id', $locationId))
            ->when($condition, fn ($q) => $q->where('condition', $condition))
            ->latest('id')
            ->paginate($perPage);
    }

    public function findById(int $id): ?Inventory
    {
        return Inventory::with(['category', 'location', 'maintenances.user'])->find($id);
    }

    public function create(array $data): Inventory
    {
        return Inventory::create($data);
    }

    public function update(Inventory $inventory, array $data): bool
    {
        return $inventory->update($data);
    }

    public function delete(Inventory $inventory): bool
    {
        return $inventory->delete();
    }
}