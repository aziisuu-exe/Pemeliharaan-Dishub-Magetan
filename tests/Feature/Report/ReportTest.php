<?php

namespace Tests\Feature\Report;

use App\Features\Category\Models\Category;
use App\Features\Inventory\Models\Inventory;
use App\Features\Location\Models\Location;
use App\Features\Maintenance\Models\Maintenance;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_view_inventory_report(): void
    {
        $category = Category::create(['name' => 'Halte']);
        $location = Location::create(['name' => 'Jl. Sudirman']);

        Inventory::create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'code' => 'HLT-001',
            'name' => 'Halte Bus Kota',
            'condition' => ItemCondition::GOOD->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);

        $response = $this->actingAs($this->user)->get(route('reports.inventory', [
            'condition' => ItemCondition::GOOD->value,
        ]));

        $response->assertOk();
    }

    public function test_can_view_maintenance_report(): void
    {
        $category = Category::create(['name' => 'Barrier']);
        $location = Location::create(['name' => 'Simpang Tiga']);

        $inventory = Inventory::create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'code' => 'BAR-001',
            'name' => 'Road Barrier Plastik',
            'condition' => ItemCondition::LIGHT_DAMAGE->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);

        Maintenance::create([
            'inventory_id' => $inventory->id,
            'user_id' => $this->user->id,
            'maintenance_date' => '2026-09-09',
            'condition_before' => ItemCondition::LIGHT_DAMAGE->value,
            'condition_after' => ItemCondition::GOOD->value,
            'action_description' => 'Penggantian stiker reflektor',
            'cost' => 50000,
            'officer_name' => 'Petugas Dishub',
        ]);

        $response = $this->actingAs($this->user)->get(route('reports.maintenance', [
            'start_date' => '2026-01-01',
            'end_date' => '2026-12-31',
        ]));

        $response->assertOk();
    }
}