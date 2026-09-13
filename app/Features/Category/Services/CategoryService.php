<?php

namespace App\Features\Category\Services;

use App\Features\Category\Models\Category;
use App\Features\Category\Repositories\CategoryRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function __construct(
        protected CategoryRepository $repository
    ) {}

    public function getPaginatedCategories(int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        return $this->repository->paginate($perPage, $search);
    }

    public function getAllCategories(): Collection
    {
        return $this->repository->all();
    }

    public function createCategory(array $data): Category
    {
        return $this->repository->create($data);
    }

    public function updateCategory(Category $category, array $data): bool
    {
        return $this->repository->update($category, $data);
    }

    public function deleteCategory(Category $category): bool
    {
        if ($category->inventories()->exists()) {
            throw new Exception('Kategori tidak dapat dihapus karena masih digunakan pada data inventaris.');
        }

        return $this->repository->delete($category);
    }
}