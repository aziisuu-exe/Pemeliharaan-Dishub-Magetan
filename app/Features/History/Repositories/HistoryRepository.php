<?php

namespace App\Features\History\Repositories;

use App\Features\Inventory\Models\Inventory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class HistoryRepository
{
    public function paginate(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Inventory::query()
            ->has('maintenances')
            ->with(['category', 'location'])
            ->withCount('maintenances')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%");
                });
            })
            ->latest('updated_at')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function findWithMaintenances(int $id): Inventory
    {
        return Inventory::query()
            ->with([
                'category',
                'location',
                'maintenances' => fn ($q) => $q->with('user')->latest('maintenance_date'),
            ])
            ->findOrFail($id);
    }
}