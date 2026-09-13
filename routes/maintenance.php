<?php

use App\Features\Maintenance\Controllers\MaintenanceController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MaintenanceController::class, 'index'])->name('maintenances.index');
Route::post('/', [MaintenanceController::class, 'store'])->name('maintenances.store');
Route::put('/{maintenance}', [MaintenanceController::class, 'update'])->name('maintenances.update');
Route::delete('/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenances.destroy');