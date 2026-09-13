<?php

namespace App\Features\Dashboard\Services;

use App\Features\Dashboard\Repositories\DashboardRepository;
use App\Support\Enums\ItemCondition;

class DashboardService
{
    public function __construct(
        protected DashboardRepository $repository
    ) {}

    public function getDashboardSummary(): array
    {
        return [
            'total_inventories' => $this->repository->countTotalInventories(),
            'total_maintenances' => $this->repository->countTotalMaintenances(),
            'conditions' => [
                'good' => $this->repository->countInventoriesByCondition(ItemCondition::GOOD),
                'light_damage' => $this->repository->countInventoriesByCondition(ItemCondition::LIGHT_DAMAGE),
                'heavy_damage' => $this->repository->countInventoriesByCondition(ItemCondition::HEAVY_DAMAGE),
            ],
            'recent_maintenances' => $this->repository->getRecentMaintenances(5),
        ];
    }
}