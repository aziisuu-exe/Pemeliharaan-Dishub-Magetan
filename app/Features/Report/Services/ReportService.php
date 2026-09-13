<?php

namespace App\Features\Report\Services;

use App\Features\Report\Repositories\ReportRepository;
use Illuminate\Database\Eloquent\Collection;

class ReportService
{
    public function __construct(
        protected ReportRepository $repository
    ) {}

    public function getInventoryReport(?int $categoryId = null, ?int $locationId = null, ?string $condition = null): Collection
    {
        return $this->repository->getInventories($categoryId, $locationId, $condition);
    }

    public function getMaintenanceReport(?string $startDate = null, ?string $endDate = null, ?int $inventoryId = null): Collection
    {
        return $this->repository->getMaintenances($startDate, $endDate, $inventoryId);
    }
}