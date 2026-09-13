<?php

namespace App\Features\Maintenance\Controllers;

use App\Features\Inventory\Models\Inventory;
use App\Features\Maintenance\Models\Maintenance;
use App\Features\Maintenance\Requests\StoreMaintenanceRequest;
use App\Features\Maintenance\Requests\UpdateMaintenanceRequest;
use App\Features\Maintenance\Services\MaintenanceService;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MaintenanceController extends Controller
{
    public function __construct(
        protected MaintenanceService $maintenanceService
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Maintenance/Index', [
            'maintenances' => $this->maintenanceService->getPaginated($request->search),
            'inventories' => Inventory::select('id', 'code', 'name')->get(),
            'users' => User::select('id', 'name')->get(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(StoreMaintenanceRequest $request): RedirectResponse
    {
        $this->maintenanceService->store($request->validated());
        return redirect()->route('maintenances.index')->with('success', 'Data berhasil ditambahkan.');
    }

    public function update(UpdateMaintenanceRequest $request, Maintenance $maintenance): RedirectResponse
    {
        $this->maintenanceService->update($maintenance, $request->validated());
        return redirect()->route('maintenances.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(Maintenance $maintenance): RedirectResponse
    {
        $this->maintenanceService->destroy($maintenance);
        return redirect()->route('maintenances.index')->with('success', 'Data berhasil dihapus.');
    }
}