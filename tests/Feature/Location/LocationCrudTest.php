<?php

namespace Tests\Feature\Location;

use App\Features\Location\Models\Location;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LocationCrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_can_view_location_list(): void
    {
        Location::create(['name' => 'Jl. Yos Sudarso']);

        $response = $this->actingAs($this->user)->get(route('locations.index'));

        $response->assertOk();
    }

    public function test_can_create_location(): void
    {
        $payload = [
            'name' => 'Simpang Telaga Sarangan',
            'address' => 'Kecamatan Plaosan, Magetan',
            'coordinate' => '-7.6761, 111.2227',
        ];

        $response = $this->actingAs($this->user)->post(route('locations.store'), $payload);

        $response->assertRedirect();
        $this->assertDatabaseHas('locations', ['name' => 'Simpang Telaga Sarangan']);
    }

    public function test_can_update_location(): void
    {
        $location = Location::create(['name' => 'Terminal Purboyo Lama']);

        $response = $this->actingAs($this->user)->put(route('locations.update', $location), [
            'name' => 'Terminal Purboyo Baru',
            'address' => 'Jl. Mayjen Sukowati, Magetan',
            'coordinate' => '-7.6489, 111.3342',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('locations', ['name' => 'Terminal Purboyo Baru']);
    }

    public function test_can_delete_location(): void
    {
        $location = Location::create(['name' => 'Pos Dishub Maospati']);

        $response = $this->actingAs($this->user)->delete(route('locations.destroy', $location));

        $response->assertRedirect();
        $this->assertDatabaseMissing('locations', ['id' => $location->id]);
    }
}