<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrator Dishub Magetan',
                'email' => 'admin.dishub@magetan.go.id',
                'password' => Hash::make('PasswordDishub2026!'),
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Bambang Sudarsono (Petugas PJU)',
                'email' => 'bambang.pju@magetan.go.id',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Hendro Prasetyo (Petugas APILL)',
                'email' => 'hendro.apill@magetan.go.id',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'name' => 'Agus Wahyudi (Petugas Rambu & Marka)',
                'email' => 'agus.rambu@magetan.go.id',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(['email' => $user['email']], $user);
        }
    }
}