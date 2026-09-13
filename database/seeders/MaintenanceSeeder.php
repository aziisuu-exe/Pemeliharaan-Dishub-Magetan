<?php

namespace Database\Seeders;

use App\Features\Inventory\Models\Inventory;
use App\Features\Maintenance\Models\Maintenance;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Database\Seeder;

class MaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::pluck('id', 'email');
        $inventories = Inventory::pluck('id', 'code');

        if ($users->isEmpty() || $inventories->isEmpty()) {
            return;
        }

        Maintenance::truncate();

        $records = [
            [
                'inventory_id' => $inventories['APL-MGT-001'],
                'user_id' => $users['hendro.apill@magetan.go.id'] ?? $users->first(),
                'maintenance_date' => '2026-08-10',
                'condition_before' => ItemCondition::HEAVY_DAMAGE->value,
                'condition_after' => ItemCondition::LIGHT_DAMAGE->value,
                'action_description' => 'Penggantian modul controller lampu merah yang konsleting karena air hujan',
            ],
            [
                'inventory_id' => $inventories['APL-MGT-001'],
                'user_id' => $users['hendro.apill@magetan.go.id'] ?? $users->first(),
                'maintenance_date' => '2026-08-28',
                'condition_before' => ItemCondition::LIGHT_DAMAGE->value,
                'condition_after' => ItemCondition::LIGHT_DAMAGE->value,
                'action_description' => 'Pengecekan jalur perkabelan bawah tanah dan grounding penangkal petir',
            ],
            [
                'inventory_id' => $inventories['PJU-MGT-002'],
                'user_id' => $users['bambang.pju@magetan.go.id'] ?? $users->first(),
                'maintenance_date' => '2026-08-15',
                'condition_before' => ItemCondition::HEAVY_DAMAGE->value,
                'condition_after' => ItemCondition::HEAVY_DAMAGE->value,
                'action_description' => 'Pemeriksaan armature putus akibat tertimpa dahan pohon, ballast terbakar',
            ],
            [
                'inventory_id' => $inventories['CRM-MGT-001'],
                'user_id' => $users['agus.rambu@magetan.go.id'] ?? $users->first(),
                'maintenance_date' => '2026-08-20',
                'condition_before' => ItemCondition::LIGHT_DAMAGE->value,
                'condition_after' => ItemCondition::GOOD->value,
                'action_description' => 'Pembersihan kaca cembung dari jamur dan pengencangan klem braket tiang',
            ],
            [
                'inventory_id' => $inventories['RMB-MGT-001'],
                'user_id' => $users['agus.rambu@magetan.go.id'] ?? $users->first(),
                'maintenance_date' => '2026-09-01',
                'condition_before' => ItemCondition::HEAVY_DAMAGE->value,
                'condition_after' => ItemCondition::LIGHT_DAMAGE->value,
                'action_description' => 'Pelurusan tiang rambu yang tertabrak kendaraan dan pengelasan plat dudukan',
            ],
            [
                'inventory_id' => $inventories['GDR-MGT-001'],
                'user_id' => $users['agus.rambu@magetan.go.id'] ?? $users->first(),
                'maintenance_date' => '2026-09-08',
                'condition_before' => ItemCondition::HEAVY_DAMAGE->value,
                'condition_after' => ItemCondition::LIGHT_DAMAGE->value,
                'action_description' => 'Pemasangan baut reflektor deliniator dan perbaikan tiang penyangga bengkok',
            ],
        ];

        foreach ($records as $record) {
            Maintenance::create($record);
        }
    }
}