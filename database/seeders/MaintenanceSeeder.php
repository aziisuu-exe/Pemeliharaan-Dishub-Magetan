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
        $user = User::first();
        $cermin = Inventory::where('code', 'CRM-MGT-001')->first();
        $apill = Inventory::where('code', 'APL-MGT-001')->first();

        if ($cermin && $user) {
            Maintenance::updateOrCreate(
                [
                    'inventory_id' => $cermin->id,
                    'maintenance_date' => '2026-08-15',
                ],
                [
                    'user_id' => $user->id,
                    'condition_before' => ItemCondition::LIGHT_DAMAGE->value,
                    'condition_after' => ItemCondition::LIGHT_DAMAGE->value,
                    'action_description' => 'Pembersihan lapisan cermin cembung dan pengencangan klem tiang',
                    'cost' => 150000,
                    'officer_name' => 'Teknisi Dishub Sarpras',
                ]
            );
        }

        if ($apill && $user) {
            Maintenance::updateOrCreate(
                [
                    'inventory_id' => $apill->id,
                    'maintenance_date' => '2026-07-20',
                ],
                [
                    'user_id' => $user->id,
                    'condition_before' => ItemCondition::LIGHT_DAMAGE->value,
                    'condition_after' => ItemCondition::GOOD->value,
                    'action_description' => 'Penggantian modul catu daya lampu aspek kuning dan kalibrasi timer',
                    'cost' => 450000,
                    'officer_name' => 'Tim APILL Dishub Magetan',
                ]
            );
        }
    }
}