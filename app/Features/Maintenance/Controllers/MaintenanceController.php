<?php

namespace App\Features\Maintenance\Controllers;

use App\Features\Inventory\Resources\InventoryResource;
use App\Features\Inventory\Services\InventoryService;
use App\Features\Maintenance\Models\Maintenance;
use App\Features\Maintenance\Requests\StoreMaintenanceRequest;
use App\Features\Maintenance\Requests\UpdateMaintenanceRequest;
use App\Features\Maintenance\Resources\MaintenanceResource;
use App\Features\Maintenance\Services\MaintenanceService;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceController extends Controller
{
    public function __construct(
        protected MaintenanceService $service,
        protected InventoryService $inventoryService
    ) {}

    public function index(Request $request): Response
    {
        $maintenances = $this->service->getPaginatedMaintenances(
            10,
            $request->query('search'),
            $request->query('inventory_id') ? (int) $request->query('inventory_id') : null
        );

        $inventories = $this->inventoryService->getPaginatedInventories(100)->items();

        return Inertia::render('Maintenance/Index', [
            'maintenances' => MaintenanceResource::collection($maintenances),
            'inventories' => InventoryResource::collection($inventories),
            'filters' => $request->only(['search', 'inventory_id']),
        ]);
    }

    public function store(StoreMaintenanceRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = (int) Auth::id();

        $this->service->createMaintenance($data);

        return redirect()->back()->with('success', 'Riwayat pemeliharaan berhasil ditambahkan.');
    }

    public function update(UpdateMaintenanceRequest $request, Maintenance $maintenance): RedirectResponse
    {
        $this->service->updateMaintenance($maintenance, $request->validated());

        return redirect()->back()->with('success', 'Riwayat pemeliharaan berhasil diperbarui.');
    }

    public function destroy(Maintenance $maintenance): RedirectResponse
    {
        $this->service->deleteMaintenance($maintenance);

        return redirect()->back()->with('success', 'Riwayat pemeliharaan berhasil dihapus.');
    }
}