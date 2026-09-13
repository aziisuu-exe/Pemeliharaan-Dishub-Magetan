<?php

namespace App\Features\Category\Repositories;

use App\Features\Category\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryRepository
{
    public function paginate(int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        return Category::query()
            ->withCount('inventories')
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate($perPage);
    }

    public function all(): Collection
    {
        return Category::query()->orderBy('name')->get();
    }

    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function update(Category $category, array $data): bool
    {
        return $category->update($data);
    }

    public function delete(Category $category): bool
    {
        return $category->delete();
    }
}