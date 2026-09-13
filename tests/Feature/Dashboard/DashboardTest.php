<?php

namespace Tests\Feature\Dashboard;

use App\Features\Category\Models\Category;
use App\Features\Inventory\Models\Inventory;
use App\Features\Location\Models\Location;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_dashboard_summary(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Cermin Tikungan']);
        $location = Location::create(['name' => 'Tikungan Sarangan']);

        Inventory::create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'code' => 'CRM-001',
            'name' => 'Cermin Cembung 80cm',
            'condition' => ItemCondition::GOOD->value,
            'quantity' => 1,
            'unit' => 'unit',
        ]);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertOk();
    }
}