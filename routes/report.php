<?php

use App\Features\Report\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ReportController::class, 'index'])->name('reports.index');
Route::get('/inventories', [ReportController::class, 'inventory'])->name('reports.inventory');
Route::get('/maintenances', [ReportController::class, 'maintenance'])->name('reports.maintenance');