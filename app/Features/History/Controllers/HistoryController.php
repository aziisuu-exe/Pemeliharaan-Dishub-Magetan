<?php

namespace App\Features\History\Controllers;

use App\Features\History\Services\HistoryService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HistoryController extends Controller
{
    public function __construct(
        protected HistoryService $historyService
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('History/Index', [
            'inventories' => $this->historyService->getPaginatedHistory($request->search),
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(int $id): Response
    {
        return Inertia::render('History/Show', [
            'inventory' => $this->historyService->getInventoryHistoryDetail($id),
        ]);
    }
}