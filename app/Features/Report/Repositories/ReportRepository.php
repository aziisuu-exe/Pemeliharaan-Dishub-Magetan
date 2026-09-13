<?php

namespace App\Features\Report\Repositories;

use App\Features\Inventory\Models\Inventory;
use App\Features\Maintenance\Models\Maintenance;
use Illuminate\Database\Eloquent\Collection;

class ReportRepository
{
    public function getInventories(?int $categoryId = null, ?int $locationId = null, ?string $condition = null): Collection
    {
        return Inventory::query()
            ->with(['category', 'location'])
            ->when($categoryId, fn ($q) => $q->where('category_id', $categoryId))
            ->when($locationId, fn ($q) => $q->where('location_id', $locationId))
            ->when($condition, fn ($q) => $q->where('condition', $condition))
            ->orderBy('name')
            ->get();
    }

    public function getMaintenances(?string $startDate = null, ?string $endDate = null, ?int $inventoryId = null): Collection
    {
        return Maintenance::query()
            ->with(['inventory.category', 'inventory.location', 'user'])
            ->when($startDate, fn ($q) => $q->whereDate('maintenance_date', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->whereDate('maintenance_date', '<=', $endDate))
            ->when($inventoryId, fn ($q) => $q->where('inventory_id', $inventoryId))
            ->latest('maintenance_date')
            ->get();
    }
}