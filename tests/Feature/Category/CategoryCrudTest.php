<?php

namespace Tests\Feature\Category;

use App\Features\Category\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryCrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_view_category_list(): void
    {
        Category::create(['name' => 'Rambu Lalu Lintas', 'description' => 'Kategori uji rambu']);

        $response = $this->actingAs($this->user)->get(route('categories.index'));

        $response->assertOk();
    }

    public function test_can_create_category(): void
    {
        $payload = [
            'name' => 'Penerangan Jalan Umum',
            'description' => 'Tiang dan lampu PJU',
        ];

        $response = $this->actingAs($this->user)->post(route('categories.store'), $payload);

        $response->assertRedirect();
        $this->assertDatabaseHas('categories', ['name' => 'Penerangan Jalan Umum']);
    }

    public function test_cannot_create_duplicate_category_name(): void
    {
        Category::create(['name' => 'APILL']);

        $response = $this->actingAs($this->user)->post(route('categories.store'), [
            'name' => 'APILL',
        ]);

        $response->assertSessionHasErrors('name');
    }

    public function test_can_update_category(): void
    {
        $category = Category::create(['name' => 'Traffic Cone Lama']);

        $response = $this->actingAs($this->user)->put(route('categories.update', $category), [
            'name' => 'Traffic Cone Baru',
            'description' => 'Deskripsi diperbarui',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('categories', ['name' => 'Traffic Cone Baru']);
    }

    public function test_can_delete_category(): void
    {
        $category = Category::create(['name' => 'Barrier Sementara']);

        $response = $this->actingAs($this->user)->delete(route('categories.destroy', $category));

        $response->assertRedirect();
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}