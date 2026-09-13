<?php

use App\Features\Category\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
Route::post('/', [CategoryController::class, 'store'])->name('categories.store');
Route::put('/{category}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');