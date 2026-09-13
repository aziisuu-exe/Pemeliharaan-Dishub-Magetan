<?php

namespace App\Features\Location\Repositories;

use App\Features\Location\Models\Location;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class LocationRepository
{
    public function paginate(int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        return Location::query()
            ->withCount('inventories')
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate($perPage);
    }

    public function all(): Collection
    {
        return Location::query()->orderBy('name')->get();
    }

    public function findById(int $id): ?Location
    {
        return Location::find($id);
    }

    public function create(array $data): Location
    {
        return Location::create($data);
    }

    public function update(Location $location, array $data): bool
    {
        return $location->update($data);
    }

    public function delete(Location $location): bool
    {
        return $location->delete();
    }
}