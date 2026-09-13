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
        $rambuCat = Category::firstOrCreate(['name' => 'Rambu Lalu Lintas'], ['description' => 'Rambu jalan']);
        $pjuCat = Category::firstOrCreate(['name' => 'Lampu Penerangan Jalan Umum (PJU)'], ['description' => 'PJU']);
        $apillCat = Category::firstOrCreate(['name' => 'APILL (Traffic Light)'], ['description' => 'Traffic light']);
        $cerminCat = Category::firstOrCreate(['name' => 'Cermin Tikungan'], ['description' => 'Cermin tikungan']);
        $barrierCat = Category::firstOrCreate(['name' => 'Road Barrier'], ['description' => 'Pembatas jalan']);

        $alunLoc = Location::firstOrCreate(
            ['name' => 'Jl. Yos Sudarso (Alun-Alun Magetan)'],
            ['address' => 'Kecamatan Magetan Kota', 'coordinate' => '-7.6534, 111.3281']
        );
        $pasarLoc = Location::firstOrCreate(
            ['name' => 'Simpang Empat Pasar Baru Magetan'],
            ['address' => 'Jl. Mayjen Sukowati', 'coordinate' => '-7.6495, 111.3298']
        );
        $saranganLoc = Location::firstOrCreate(
            ['name' => 'Ruas Jalur Wisata Telaga Sarangan'],
            ['address' => 'Kecamatan Plaosan', 'coordinate' => '-7.6761, 111.2227']
        );
        $maospatiLoc = Location::firstOrCreate(
            ['name' => 'Terminal Maospati Magetan'],
            ['address' => 'Kecamatan Maospati', 'coordinate' => '-7.5672, 111.4391']
        );

        $items = [
            [
                'category_id' => $rambuCat->id,
                'location_id' => $saranganLoc->id,
                'code' => 'RMB-MGT-001',
                'name' => 'Rambu Peringatan Turunan Curam',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 4,
                'unit' => 'Unit',
                'procurement_year' => 2024,
                'specification' => 'Plat aluminium 1.8mm retroreflektif engineering grade',
            ],
            [
                'category_id' => $cerminCat->id,
                'location_id' => $saranganLoc->id,
                'code' => 'CRM-MGT-001',
                'name' => 'Cermin Tikungan Cembung 80cm',
                'condition' => ItemCondition::LIGHT_DAMAGE->value,
                'quantity' => 2,
                'unit' => 'Unit',
                'procurement_year' => 2023,
                'specification' => 'Stainless convex mirror diameter 80cm tiang galvanis',
            ],
            [
                'category_id' => $apillCat->id,
                'location_id' => $pasarLoc->id,
                'code' => 'APL-MGT-001',
                'name' => 'APILL Persimpangan 3 Aspek 30cm',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 4,
                'unit' => 'Set',
                'procurement_year' => 2024,
                'specification' => 'Lampu LED ultra bright dengan controller mikrokontroler ATSC',
            ],
            [
                'category_id' => $pjuCat->id,
                'location_id' => $alunLoc->id,
                'code' => 'PJU-MGT-001',
                'name' => 'Lampu PJU Solar Cell LED 60W',
                'condition' => ItemCondition::GOOD->value,
                'quantity' => 12,
                'unit' => 'Titik',
                'procurement_year' => 2025,
                'specification' => 'Tiang oktagonal 9 meter, panel surya monocrystalline 150WP',
            ],
            [
                'category_id' => $barrierCat->id,
                'location_id' => $maospatiLoc->id,
                'code' => 'BAR-MGT-001',
                'name' => 'Water Barrier Plastik HDPE',
                'condition' => ItemCondition::HEAVY_DAMAGE->value,
                'quantity' => 10,
                'unit' => 'Buah',
                'procurement_year' => 2022,
                'specification' => 'Bahan HDPE tebal isi air kapasitas 150 liter, retak bagian bawah',
            ],
        ];

        foreach ($items as $item) {
            Inventory::updateOrCreate(['code' => $item['code']], $item);
        }
    }
}