<?php

namespace Database\Seeders;

use App\Features\Category\Models\Category;
use App\Features\Inventory\Models\Inventory;
use App\Features\Location\Models\Location;
use App\Support\Enums\ItemCondition;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::pluck('id', 'name');
        $locations = Location::pluck('id', 'name');

        $items = [
            [
                'category_id' => $categories['Rambu Lalu Lintas'],
                'location_id' => $locations['Ruas Jalur Wisata Telaga Sarangan'],
                'code' => 'RMB-MGT-001',
                'name' => 'Rambu Peringatan Turunan Curam',
                'condition' => ItemCondition::LIGHT_DAMAGE->value,
                'quantity' => 4,
                'unit' => 'Unit',
                'procurement_year' => 2024,
                'specification' => 'Plat aluminium 1.8mm retroreflektif engineering grade',
            ],
            [
                'category_id' => $categories['Rambu Lalu Lintas'],
                'location_id' => $locations['Jl. Yos Sudarso (Alun-Alun Magetan)'],
                'code' => 'RMB-MGT-002',
                'name' => 'Rambu Larangan Parkir (P Coret)',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 2,
                'unit' => 'Unit',
                'procurement_year' => 2024,
                'specification' => 'Daun rambu diameter 60cm pipa galvanis 2 inch',
            ],
            [
                'category_id' => $categories['Cermin Tikungan'],
                'location_id' => $locations['Ruas Jalur Wisata Telaga Sarangan'],
                'code' => 'CRM-MGT-001',
                'name' => 'Cermin Tikungan Cembung 80cm',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 2,
                'unit' => 'Unit',
                'procurement_year' => 2023,
                'specification' => 'Stainless convex mirror diameter 80cm dengan pelindung topi',
            ],
            [
                'category_id' => $categories['APILL (Traffic Light)'],
                'location_id' => $locations['Simpang Empat Pasar Baru Magetan'],
                'code' => 'APL-MGT-001',
                'name' => 'APILL Persimpangan 3 Aspek 30cm',
                'condition' => ItemCondition::LIGHT_DAMAGE->value,
                'quantity' => 4,
                'unit' => 'Set',
                'procurement_year' => 2024,
                'specification' => 'Lampu LED ultra bright dengan controller ATSC cerdas',
            ],
            [
                'category_id' => $categories['APILL (Traffic Light)'],
                'location_id' => $locations['Simpang Tiga Gorang-Gareng'],
                'code' => 'APL-MGT-002',
                'name' => 'Warning Light Solar Cell Kuning 2 Aspek',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 2,
                'unit' => 'Set',
                'procurement_year' => 2025,
                'specification' => 'Kedip kuning 2 aspek 30cm panel surya mandiri',
            ],
            [
                'category_id' => $categories['Lampu Penerangan Jalan Umum (PJU)'],
                'location_id' => $locations['Jl. Yos Sudarso (Alun-Alun Magetan)'],
                'code' => 'PJU-MGT-001',
                'name' => 'Lampu PJU Solar Cell LED 60W',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 12,
                'unit' => 'Titik',
                'procurement_year' => 2025,
                'specification' => 'Tiang oktagonal 9 meter panel monocrystalline 150WP',
            ],
            [
                'category_id' => $categories['Lampu Penerangan Jalan Umum (PJU)'],
                'location_id' => $locations['Terminal Maospati Magetan'],
                'code' => 'PJU-MGT-002',
                'name' => 'PJU Konvensional Son-T 150W',
                'condition' => ItemCondition::HEAVY_DAMAGE->value,
                'quantity' => 6,
                'unit' => 'Titik',
                'procurement_year' => 2022,
                'specification' => 'Lampu merkuri fitting E40 armature bulat tiang beton',
            ],
            [
                'category_id' => $categories['Road Barrier'],
                'location_id' => $locations['Terminal Maospati Magetan'],
                'code' => 'BAR-MGT-001',
                'name' => 'Water Barrier Plastik HDPE',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 10,
                'unit' => 'Buah',
                'procurement_year' => 2023,
                'specification' => 'Bahan HDPE oranye kapasitas air 150 liter',
            ],
            [
                'category_id' => $categories['Traffic Cone'],
                'location_id' => $locations['Simpang Empat Kraton'],
                'code' => 'CON-MGT-001',
                'name' => 'Rubber Traffic Cone Base Hitam 75cm',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 15,
                'unit' => 'Buah',
                'procurement_year' => 2025,
                'specification' => 'Karet elastis tahan benturan scotlite ganda putih',
            ],
            [
                'category_id' => $categories['Halte Angkutan'],
                'location_id' => $locations['Kawasan Perkantoran Pemkab Magetan'],
                'code' => 'HLT-MGT-001',
                'name' => 'Shelter Halte Baja Pipa Galvanis',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 1,
                'unit' => 'Unit',
                'procurement_year' => 2024,
                'specification' => 'Atap spandek bangku terintegrasi papan rute informasi',
            ],
            [
                'category_id' => $categories['Pagar Pengaman Jalan (Guardrail)'],
                'location_id' => $locations['Ruas Jalur Wisata Telaga Sarangan'],
                'code' => 'GDR-MGT-001',
                'name' => 'Guardrail Baja W-Beam Pengaman Jurang',
                'condition' => ItemCondition::LIGHT_DAMAGE->value,
                'quantity' => 50,
                'unit' => 'Meter',
                'procurement_year' => 2023,
                'specification' => 'Lempengan baja hot dip galvanis profil W tebal 2.7mm',
            ],
        ];

        foreach ($items as $item) {
            Inventory::updateOrCreate(['code' => $item['code']], $item);
        }
    }
}