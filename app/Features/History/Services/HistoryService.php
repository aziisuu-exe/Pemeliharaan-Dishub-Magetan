<?php

namespace App\Features\History\Services;

use App\Features\History\Repositories\HistoryRepository;
use App\Features\Inventory\Models\Inventory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class HistoryService
{
    public function __construct(
        protected HistoryRepository $historyRepository
    ) {}

    public function getPaginatedHistory(?string $search = null): LengthAwarePaginator
    {
        return $this->historyRepository->paginate($search);
    }

    public function getInventoryHistoryDetail(int $id): Inventory
    {
        return $this->historyRepository->findWithMaintenances($id);
    }
}