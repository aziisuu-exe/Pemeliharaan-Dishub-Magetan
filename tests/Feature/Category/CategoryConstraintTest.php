<?php

namespace Tests\Feature\Category;

use App\Features\Category\Models\Category;
use App\Features\Inventory\Models\Inventory;
use App\Features\Location\Models\Location;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryConstraintTest extends TestCase
{
    use RefreshDatabase;

    public function test_cannot_delete_category_that_has_inventories(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'APILL']);
        $location = Location::create(['name' => 'Simpang Empat']);

        Inventory::create([
            'category_id' => $category->id,
            'location_id' => $location->id,
            'code' => 'APL-001',
            'name' => 'Lampu APILL 3 Warna',
            'condition' => ItemCondition::GOOD->value,
            'quantity' => 1,
            'unit' => 'set',
        ]);

        $response = $this->actingAs($user)->delete(route('categories.destroy', $category));

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('categories', ['id' => $category->id]);
    }
}