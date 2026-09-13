<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin.dishub@magetan.go.id',
            'password' => Hash::make('PasswordDishub2026!'),
        ]);

        $response = $this->post('/login', [
            'email' => 'admin.dishub@magetan.go.id',
            'password' => 'PasswordDishub2026!',
        ]);

        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_user_cannot_login_with_invalid_password(): void
    {
        User::factory()->create([
            'email' => 'admin.dishub@magetan.go.id',
            'password' => Hash::make('PasswordDishub2026!'),
        ]);

        $this->post('/login', [
            'email' => 'admin.dishub@magetan.go.id',
            'password' => 'SalahPassword!',
        ]);

        $this->assertGuest();
    }
}