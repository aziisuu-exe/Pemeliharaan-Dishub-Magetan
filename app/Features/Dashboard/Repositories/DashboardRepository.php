<?php

namespace App\Features\Dashboard\Repositories;

use App\Features\Inventory\Models\Inventory;
use App\Features\Maintenance\Models\Maintenance;
use App\Support\Enums\ItemCondition;
use Illuminate\Database\Eloquent\Collection;

class DashboardRepository
{
    public function countTotalInventories(): int
    {
        return Inventory::count();
    }

    public function countInventoriesByCondition(ItemCondition $condition): int
    {
        return Inventory::where('condition', $condition->value)->count();
    }

    public function countTotalMaintenances(): int
    {
        return Maintenance::count();
    }

    public function getRecentMaintenances(int $limit = 5): Collection
    {
        return Maintenance::query()
            ->with(['inventory', 'user'])
            ->latest('maintenance_date')
            ->latest('id')
            ->limit($limit)
            ->get();
    }
}