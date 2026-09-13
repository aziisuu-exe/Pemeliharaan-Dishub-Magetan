<?php

namespace App\Features\Dashboard\Controllers;

use App\Features\Dashboard\Services\DashboardService;
use App\Features\Maintenance\Resources\MaintenanceResource;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $service
    ) {}

    public function index(): Response
    {
        $summary = $this->service->getDashboardSummary();

        return Inertia::render('Dashboard/Index', [
            'summary' => [
                'total_inventories' => $summary['total_inventories'],
                'total_maintenances' => $summary['total_maintenances'],
                'conditions' => $summary['conditions'],
                'recent_maintenances' => MaintenanceResource::collection($summary['recent_maintenances']),
            ],
        ]);
    }
}