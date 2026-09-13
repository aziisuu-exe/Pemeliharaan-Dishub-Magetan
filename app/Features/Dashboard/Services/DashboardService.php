<?php

namespace App\Features\Dashboard\Services;

use App\Features\Dashboard\Repositories\DashboardRepository;

class DashboardService
{
    public function __construct(
        protected DashboardRepository $dashboardRepository
    ) {}

    public function getDashboardSummary(): array
    {
        return [
            'total_inventories' => $this->dashboardRepository->getTotalInventories(),
            'total_maintenances' => $this->dashboardRepository->getTotalMaintenances(),
            'good_condition' => $this->dashboardRepository->getGoodConditionCount(),
            'repair_needed' => $this->dashboardRepository->getRepairNeededCount(),
            'condition_distribution' => $this->dashboardRepository->getConditionDistribution(),
            'recent_maintenances' => $this->dashboardRepository->getRecentMaintenances(),
        ];
    }
}