<?php

namespace Tests\Feature\Maintenance;

use App\Features\Category\Models\Category;
use App\Features\Inventory\Models\Inventory;
use App\Features\Location\Models\Location;
use App\Features\Maintenance\Models\Maintenance;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MaintenanceCrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Inventory $inventory;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $category = Category::create(['name' => 'PJU']);
        $location = Location::create(['name' => 'Jl. Sukowati']);

        $this->inventory = Inventory::create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'code' => 'PJU-001',
            'name' => 'Lampu PJU Solar Sel',
            'condition' => ItemCondition::LIGHT_DAMAGE->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);
    }

    public function test_can_create_maintenance_and_synchronize_inventory_condition(): void
    {
        $payload = [
            'inventory_id' => $this->inventory->id,
            'maintenance_date' => '2026-09-09',
            'condition_before' => ItemCondition::LIGHT_DAMAGE->value,
            'condition_after' => ItemCondition::GOOD->value,
            'action_description' => 'Penggantian modul baterai solar sel',
            'cost' => 350000,
            'officer_name' => 'Teknisi Dishub',
        ];

        $response = $this->actingAs($this->user)->post(route('maintenances.store'), $payload);

        $response->assertRedirect();
        $this->assertDatabaseHas('maintenances', [
            'inventory_id' => $this->inventory->id,
            'officer_name' => 'Teknisi Dishub',
        ]);

        $this->assertDatabaseHas('inventories', [
            'id' => $this->inventory->id,
            'condition' => ItemCondition::GOOD->value,
        ]);
    }

    public function test_can_delete_maintenance(): void
    {
        $maintenance = Maintenance::create([
            'inventory_id' => $this->inventory->id,
            'user_id' => $this->user->id,
            'maintenance_date' => '2026-09-09',
            'condition_before' => ItemCondition::LIGHT_DAMAGE->value,
            'condition_after' => ItemCondition::GOOD->value,
            'action_description' => 'Perbaikan kabel putus',
            'cost' => 100000,
            'officer_name' => 'Teknisi Dishub',
        ]);

        $response = $this->actingAs($this->user)->delete(route('maintenances.destroy', $maintenance));

        $response->assertRedirect();
        $this->assertDatabaseMissing('maintenances', ['id' => $maintenance->id]);
    }
}