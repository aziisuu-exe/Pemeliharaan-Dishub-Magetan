<?php

namespace App\Features\Dashboard\Repositories;

use App\Features\Inventory\Models\Inventory;
use App\Features\Maintenance\Models\Maintenance;
use Illuminate\Database\Eloquent\Collection;

class DashboardRepository
{
    public function getTotalInventories(): int
    {
        return Inventory::count();
    }

    public function getTotalMaintenances(): int
    {
        return Maintenance::count();
    }

    public function getGoodConditionCount(): int
    {
        return Inventory::where('condition', 'good')->count();
    }

    public function getRepairNeededCount(): int
    {
        return Inventory::whereIn('condition', ['light_damage', 'heavy_damage'])->count();
    }

    public function getConditionDistribution(): array
    {
        $good = Inventory::where('condition', 'good')->count();
        $light = Inventory::where('condition', 'light_damage')->count();
        $heavy = Inventory::where('condition', 'heavy_damage')->count();
        $total = $good + $light + $heavy;

        return [
            'good' => $good,
            'light_damage' => $light,
            'heavy_damage' => $heavy,
            'good_pct' => $total > 0 ? round(($good / $total) * 100) : 0,
            'light_damage_pct' => $total > 0 ? round(($light / $total) * 100) : 0,
            'heavy_damage_pct' => $total > 0 ? round(($heavy / $total) * 100) : 0,
        ];
    }

    public function getRecentMaintenances(int $limit = 5): Collection
    {
        return Maintenance::query()
            ->with(['inventory', 'user'])
            ->latest('maintenance_date')
            ->limit($limit)
            ->get();
    }
}