<?php

namespace App\Features\Category\Controllers;

use App\Features\Category\Models\Category;
use App\Features\Category\Requests\StoreCategoryRequest;
use App\Features\Category\Requests\UpdateCategoryRequest;
use App\Features\Category\Resources\CategoryResource;
use App\Features\Category\Services\CategoryService;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $service
    ) {}

    public function index(Request $request): Response
    {
        $categories = $this->service->getPaginatedCategories(
            10,
            $request->query('search')
        );

        return Inertia::render('Category/Index', [
            'categories' => CategoryResource::collection($categories),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $this->service->createCategory($request->validated());

        return redirect()->back()->with('success', 'Data kategori berhasil ditambahkan.');
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $this->service->updateCategory($category, $request->validated());

        return redirect()->back()->with('success', 'Data kategori berhasil diperbarui.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        try {
            $this->service->deleteCategory($category);
            return redirect()->back()->with('success', 'Data kategori berhasil dihapus.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}