<?php

use App\Features\Inventory\Controllers\InventoryController;
use Illuminate\Support\Facades\Route;

Route::get('/', [InventoryController::class, 'index'])->name('inventories.index');
Route::post('/', [InventoryController::class, 'store'])->name('inventories.store');
Route::get('/{inventory}', [InventoryController::class, 'show'])->name('inventories.show');
Route::put('/{inventory}', [InventoryController::class, 'update'])->name('inventories.update');
Route::delete('/{inventory}', [InventoryController::class, 'destroy'])->name('inventories.destroy');