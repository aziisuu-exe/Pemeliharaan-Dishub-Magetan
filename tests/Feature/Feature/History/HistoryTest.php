<?php

namespace Tests\Feature\History;

use App\Features\Category\Models\Category;
use App\Features\Inventory\Models\Inventory;
use App\Features\Location\Models\Location;
use App\Features\Maintenance\Models\Maintenance;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HistoryTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Inventory $inventory;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $category = Category::create([
            'code' => 'RMB',
            'name' => 'Rambu',
            'description' => 'Rambu Lalu Lintas',
        ]);

        $location = Location::create([
            'code' => 'KRT',
            'name' => 'Kraton',
            'address' => 'Jl. Kraton Magetan',
        ]);

        $this->inventory = Inventory::create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'code' => 'RMB-001',
            'name' => 'Rambu Peringatan',
            'condition' => 'good',
        ]);

        Maintenance::create([
            'inventory_id' => $this->inventory->id,
            'user_id' => $this->user->id,
            'maintenance_date' => '2026-09-10',
            'condition_before' => 'light_damage',
            'condition_after' => 'good',
            'action_description' => 'Pembersihan dan pengecatan ulang tiang',
        ]);
    }

    public function test_unauthenticated_user_cannot_access_history_index(): void
    {
        $response = $this->get('/history');

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_render_history_index_page(): void
    {
        $response = $this->actingAs($this->user)->get('/history');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('History/Index')
            ->has('inventories.data', 1)
            ->where('inventories.data.0.code', 'RMB-001')
        );
    }

    public function test_authenticated_user_can_render_history_detail_page(): void
    {
        $response = $this->actingAs($this->user)->get("/history/{$this->inventory->id}");

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('History/Show')
            ->has('inventory')
            ->where('inventory.code', 'RMB-001')
            ->has('inventory.maintenances', 1)
        );
    }
}