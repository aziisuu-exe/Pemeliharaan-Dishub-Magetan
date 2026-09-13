<?php

namespace App\Features\Inventory\Controllers;

use App\Features\Category\Services\CategoryService;
use App\Features\Inventory\Models\Inventory;
use App\Features\Inventory\Requests\StoreInventoryRequest;
use App\Features\Inventory\Requests\UpdateInventoryRequest;
use App\Features\Inventory\Resources\InventoryResource;
use App\Features\Inventory\Services\InventoryService;
use App\Features\Location\Services\LocationService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    public function __construct(
        protected InventoryService $service,
        protected CategoryService $categoryService,
        protected LocationService $locationService
    ) {}

    public function index(Request $request): Response
    {
        $inventories = $this->service->getPaginatedInventories(
            10,
            $request->query('search'),
            $request->query('category_id') ? (int) $request->query('category_id') : null,
            $request->query('location_id') ? (int) $request->query('location_id') : null,
            $request->query('condition')
        );

        return Inertia::render('Inventory/Index', [
            'inventories' => InventoryResource::collection($inventories),
            'categories' => $this->categoryService->getAllCategories(),
            'locations' => $this->locationService->getAllLocations(),
            'filters' => $request->only(['search', 'category_id', 'location_id', 'condition']),
        ]);
    }

    public function show(int $id): Response
    {
        $inventory = $this->service->getInventoryById($id);
        abort_if(!$inventory, 404);

        return Inertia::render('Inventory/Show', [
            'inventory' => new InventoryResource($inventory),
        ]);
    }

    public function store(StoreInventoryRequest $request): RedirectResponse
    {
        $this->service->createInventory($request->validated());

        return redirect()->back()->with('success', 'Data inventaris berhasil ditambahkan.');
    }

    public function update(UpdateInventoryRequest $request, Inventory $inventory): RedirectResponse
    {
        $this->service->updateInventory($inventory, $request->validated());

        return redirect()->back()->with('success', 'Data inventaris berhasil diperbarui.');
    }

    public function destroy(Inventory $inventory): RedirectResponse
    {
        $this->service->deleteInventory($inventory);

        return redirect()->back()->with('success', 'Data inventaris berhasil dihapus.');
    }
}