<?php

namespace App\Features\Inventory\Services;

use App\Features\Inventory\Models\Inventory;
use App\Features\Inventory\Repositories\InventoryRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class InventoryService
{
    public function __construct(
        protected InventoryRepository $repository
    ) {}

    public function getPaginatedInventories(
        int $perPage = 10,
        ?string $search = null,
        ?int $categoryId = null,
        ?int $locationId = null,
        ?string $condition = null
    ): LengthAwarePaginator {
        return $this->repository->paginate($perPage, $search, $categoryId, $locationId, $condition);
    }

    public function getInventoryById(int $id): ?Inventory
    {
        return $this->repository->findById($id);
    }

    public function createInventory(array $data): Inventory
    {
        return $this->repository->create($data);
    }

    public function updateInventory(Inventory $inventory, array $data): bool
    {
        return $this->repository->update($inventory, $data);
    }

    public function deleteInventory(Inventory $inventory): bool
    {
        return $this->repository->delete($inventory);
    }
}