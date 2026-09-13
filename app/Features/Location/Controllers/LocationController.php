<?php

namespace App\Features\Location\Controllers;

use App\Features\Location\Models\Location;
use App\Features\Location\Requests\StoreLocationRequest;
use App\Features\Location\Requests\UpdateLocationRequest;
use App\Features\Location\Resources\LocationResource;
use App\Features\Location\Services\LocationService;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    public function __construct(
        protected LocationService $service
    ) {}

    public function index(Request $request): Response
    {
        $locations = $this->service->getPaginatedLocations(
            10,
            $request->query('search')
        );

        return Inertia::render('Location/Index', [
            'locations' => LocationResource::collection($locations),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(StoreLocationRequest $request): RedirectResponse
    {
        $this->service->createLocation($request->validated());

        return redirect()->back()->with('success', 'Data lokasi berhasil ditambahkan.');
    }

    public function update(UpdateLocationRequest $request, Location $location): RedirectResponse
    {
        $this->service->updateLocation($location, $request->validated());

        return redirect()->back()->with('success', 'Data lokasi berhasil diperbarui.');
    }

    public function destroy(Location $location): RedirectResponse
    {
        try {
            $this->service->deleteLocation($location);
            return redirect()->back()->with('success', 'Data lokasi berhasil dihapus.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}