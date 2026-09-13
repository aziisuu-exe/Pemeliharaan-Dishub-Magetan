<?php

namespace Database\Seeders;

use App\Features\Inventory\Models\Inventory;
use App\Features\Maintenance\Models\Maintenance;
use App\Models\User;
use Illuminate\Database\Seeder;

class MaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $inventories = Inventory::take(2)->get();

        if ($inventories->isEmpty() || !$user) {
            return;
        }

        Maintenance::truncate();

        Maintenance::create([
            'inventory_id' => $inventories[0]->id,
            'user_id' => $user->id,
            'maintenance_date' => '2026-08-15',
            'condition_before' => 'light_damage',
            'condition_after' => 'light_damage',
            'action_description' => 'Pengecekan kabel dan sambungan optik modul lampu',
        ]);

        if (isset($inventories[1])) {
            Maintenance::create([
                'inventory_id' => $inventories[1]->id,
                'user_id' => $user->id,
                'maintenance_date' => '2026-07-20',
                'condition_before' => 'light_damage',
                'condition_after' => 'good',
                'action_description' => 'Penggantian lampu sinyal merah yang padam',
            ]);
        }
    }
}