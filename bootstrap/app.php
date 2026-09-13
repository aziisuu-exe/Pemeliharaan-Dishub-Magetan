<?php

// use Illuminate\Foundation\Application;
// use Illuminate\Foundation\Configuration\Exceptions;
// use Illuminate\Foundation\Configuration\Middleware;
// use Illuminate\Support\Facades\Route;

// return Application::configure(basePath: dirname(__DIR__))
//     ->withRouting(
//         web: __DIR__ . '/../routes/web.php',
//         commands: __DIR__ . '/../routes/console.php',
//         health: '/up',
//         then: function () {
//             Route::middleware(['web', 'auth'])
//                 ->group(function () {
//                     Route::prefix('dashboard')->group(base_path('routes/dashboard.php'));
//                     Route::prefix('categories')->group(base_path('routes/category.php'));
//                     Route::prefix('locations')->group(base_path('routes/location.php'));
//                     Route::prefix('inventories')->group(base_path('routes/inventory.php'));
//                     Route::prefix('maintenances')->group(base_path('routes/maintenance.php'));
//                     Route::prefix('reports')->group(base_path('routes/report.php'));
//                 });
//         },
//     )
//     ->withMiddleware(function (Middleware $middleware) {
//         $middleware->validateCsrfTokens(except: [
//             'login',
//             'categories',
//             'categories/*',
//             'locations',
//             'locations/*',
//             'inventories',
//             'inventories/*',
//             'maintenances',
//             'maintenances/*',
//             'reports/*',
//         ]);

//         $middleware->web(append: [
//             \App\Http\Middleware\HandleInertiaRequests::class,
//             \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
//         ]);
//     })
//     ->withExceptions(function (Exceptions $exceptions) {
//         //
//     })->create();

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware(['web', 'auth'])
                ->group(function () {
                    Route::prefix('dashboard')->group(base_path('routes/dashboard.php'));
                    Route::prefix('categories')->group(base_path('routes/category.php'));
                    Route::prefix('locations')->group(base_path('routes/location.php'));
                    Route::prefix('inventories')->group(base_path('routes/inventory.php'));
                    Route::prefix('maintenances')->group(base_path('routes/maintenance.php'));
                    Route::prefix('reports')->group(base_path('routes/report.php'));
                });
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();