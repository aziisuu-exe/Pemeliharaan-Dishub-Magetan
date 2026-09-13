<?php

namespace App\Features\Location\Services;

use App\Features\Location\Models\Location;
use App\Features\Location\Repositories\LocationRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class LocationService
{
    public function __construct(
        protected LocationRepository $repository
    ) {}

    public function getPaginatedLocations(int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        return $this->repository->paginate($perPage, $search);
    }

    public function getAllLocations(): Collection
    {
        return $this->repository->all();
    }

    public function createLocation(array $data): Location
    {
        return $this->repository->create($data);
    }

    public function updateLocation(Location $location, array $data): bool
    {
        return $this->repository->update($location, $data);
    }

    public function deleteLocation(Location $location): bool
    {
        if ($location->inventories()->exists()) {
            throw new Exception('Lokasi tidak dapat dihapus karena masih digunakan pada data inventaris.');
        }

        return $this->repository->delete($location);
    }
}