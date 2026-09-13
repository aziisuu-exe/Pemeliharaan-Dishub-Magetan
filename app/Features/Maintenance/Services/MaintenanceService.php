<?php

namespace App\Features\Maintenance\Services;

use App\Features\Inventory\Repositories\InventoryRepository;
use App\Features\Maintenance\Models\Maintenance;
use App\Features\Maintenance\Repositories\MaintenanceRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class MaintenanceService
{
    public function __construct(
        protected MaintenanceRepository $repository,
        protected InventoryRepository $inventoryRepository
    ) {}

    public function getPaginatedMaintenances(
        int $perPage = 10,
        ?string $search = null,
        ?int $inventoryId = null
    ): LengthAwarePaginator {
        return $this->repository->paginate($perPage, $search, $inventoryId);
    }

    public function createMaintenance(array $data): Maintenance
    {
        return DB::transaction(function () use ($data) {
            $maintenance = $this->repository->create($data);

            $inventory = $this->inventoryRepository->findById($data['inventory_id']);
            if ($inventory && isset($data['condition_after'])) {
                $this->inventoryRepository->update($inventory, [
                    'condition' => $data['condition_after'],
                ]);
            }

            return $maintenance;
        });
    }

    public function updateMaintenance(Maintenance $maintenance, array $data): bool
    {
        return DB::transaction(function () use ($maintenance, $data) {
            $updated = $this->repository->update($maintenance, $data);

            if ($updated && isset($data['condition_after'])) {
                $inventory = $this->inventoryRepository->findById($maintenance->inventory_id);
                if ($inventory) {
                    $this->inventoryRepository->update($inventory, [
                        'condition' => $data['condition_after'],
                    ]);
                }
            }

            return $updated;
        });
    }

    public function deleteMaintenance(Maintenance $maintenance): bool
    {
        return $this->repository->delete($maintenance);
    }
}