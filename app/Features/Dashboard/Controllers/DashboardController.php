<?php

namespace App\Features\Dashboard\Controllers;

use App\Features\Dashboard\Services\DashboardService;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService
    ) {}

    public function index(): Response
    {
        return Inertia::render('Dashboard/Index', [
            'summary' => $this->dashboardService->getDashboardSummary(),
        ]);
    }
}