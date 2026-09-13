<?php

namespace Tests\Feature\Inventory;

use App\Features\Category\Models\Category;
use App\Features\Inventory\Models\Inventory;
use App\Features\Location\Models\Location;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InventoryCrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Category $category;
    protected Location $location;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->category = Category::create(['name' => 'Rambu Lalu Lintas']);
        $this->location = Location::create(['name' => 'Jl. Yos Sudarso']);
    }

    public function test_can_create_inventory(): void
    {
        $payload = [
            'category_id' => $this->category->id,
            'location_id' => $this->location->id,
            'code' => 'RMB-001',
            'name' => 'Rambu Stop 60cm',
            'condition' => ItemCondition::GOOD->value,
            'quantity' => 1,
            'unit' => 'unit',
            'procurement_year' => 2025,
            'specification' => 'Aluminium reflektif',
        ];

        $response = $this->actingAs($this->user)->post(route('inventories.store'), $payload);

        $response->assertRedirect();
        $this->assertDatabaseHas('inventories', ['code' => 'RMB-001', 'name' => 'Rambu Stop 60cm']);
    }

    public function test_can_view_inventory_detail(): void
    {
        $inventory = Inventory::create([
            'category_id' => $this->category->id,
            'location_id' => $this->location->id,
            'code' => 'RMB-002',
            'name' => 'Rambu Dilarang Masuk',
            'condition' => ItemCondition::GOOD->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);

        $response = $this->actingAs($this->user)->get(route('inventories.show', $inventory->id));

        $response->assertOk();
    }

    public function test_can_update_inventory(): void
    {
        $inventory = Inventory::create([
            'category_id' => $this->category->id,
            'location_id' => $this->location->id,
            'code' => 'RMB-003',
            'name' => 'Rambu Tikungan',
            'condition' => ItemCondition::GOOD->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);

        $response = $this->actingAs($this->user)->put(route('inventories.update', $inventory), [
            'category_id' => $this->category->id,
            'location_id' => $this->location->id,
            'code' => 'RMB-003',
            'name' => 'Rambu Tikungan Ganda',
            'condition' => ItemCondition::LIGHT_DAMAGE->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('inventories', ['name' => 'Rambu Tikungan Ganda', 'condition' => 'light_damage']);
    }

    public function test_can_delete_inventory(): void
    {
        $inventory = Inventory::create([
            'category_id' => $this->category->id,
            'location_id' => $this->location->id,
            'code' => 'RMB-004',
            'name' => 'Rambu Sementara',
            'condition' => ItemCondition::GOOD->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);

        $response = $this->actingAs($this->user)->delete(route('inventories.destroy', $inventory));

        $response->assertRedirect();
        $this->assertDatabaseMissing('inventories', ['id' => $inventory->id]);
    }
}