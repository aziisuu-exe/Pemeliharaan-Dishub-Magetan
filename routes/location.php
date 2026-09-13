<?php

use App\Features\Location\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LocationController::class, 'index'])->name('locations.index');
Route::post('/', [LocationController::class, 'store'])->name('locations.store');
Route::put('/{location}', [LocationController::class, 'update'])->name('locations.update');
Route::delete('/{location}', [LocationController::class, 'destroy'])->name('locations.destroy');