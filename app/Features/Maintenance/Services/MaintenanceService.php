<?php

namespace App\Features\Maintenance\Services;

use App\Features\Maintenance\Models\Maintenance;
use App\Features\Maintenance\Repositories\MaintenanceRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MaintenanceService
{
    public function __construct(
        protected MaintenanceRepository $maintenanceRepository
    ) {}

    public function getPaginated(?string $search = null): LengthAwarePaginator
    {
        return $this->maintenanceRepository->paginate($search);
    }

    public function store(array $data): Maintenance
    {
        return $this->maintenanceRepository->create($data);
    }

    public function update(Maintenance $maintenance, array $data): bool
    {
        return $this->maintenanceRepository->update($maintenance, $data);
    }

    public function destroy(Maintenance $maintenance): bool
    {
        return $this->maintenanceRepository->delete($maintenance);
    }
}