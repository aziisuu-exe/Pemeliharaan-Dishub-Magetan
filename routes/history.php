<?php

use App\Features\History\Controllers\HistoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('history')->name('history.')->group(function () {
    Route::get('/', [HistoryController::class, 'index'])->name('index');
    Route::get('/{id}', [HistoryController::class, 'show'])->name('show');
});