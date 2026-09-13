<?php

namespace App\Features\Report\Controllers;

use App\Features\Category\Services\CategoryService;
use App\Features\Inventory\Resources\InventoryResource;
use App\Features\Location\Services\LocationService;
use App\Features\Maintenance\Resources\MaintenanceResource;
use App\Features\Report\Requests\InventoryReportRequest;
use App\Features\Report\Requests\MaintenanceReportRequest;
use App\Features\Report\Services\ReportService;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(
        protected ReportService $service,
        protected CategoryService $categoryService,
        protected LocationService $locationService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Report/Index', [
            'categories' => $this->categoryService->getAllCategories(),
            'locations' => $this->locationService->getAllLocations(),
        ]);
    }

    public function inventory(InventoryReportRequest $request): Response
    {
        $data = $this->service->getInventoryReport(
            $request->query('category_id') ? (int) $request->query('category_id') : null,
            $request->query('location_id') ? (int) $request->query('location_id') : null,
            $request->query('condition')
        );

        return Inertia::render('Report/InventoryPrint', [
            'inventories' => InventoryResource::collection($data),
            'filters' => $request->only(['category_id', 'location_id', 'condition']),
        ]);
    }

    public function maintenance(MaintenanceReportRequest $request): Response
    {
        $data = $this->service->getMaintenanceReport(
            $request->query('start_date'),
            $request->query('end_date'),
            $request->query('inventory_id') ? (int) $request->query('inventory_id') : null
        );

        return Inertia::render('Report/MaintenancePrint', [
            'maintenances' => MaintenanceResource::collection($data),
            'filters' => $request->only(['start_date', 'end_date', 'inventory_id']),
        ]);
    }
}