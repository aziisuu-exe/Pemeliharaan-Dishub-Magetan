<?php

namespace Database\Seeders;

use App\Features\Location\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Jl. Yos Sudarso (Alun-Alun Magetan)',
                'address' => 'Kecamatan Magetan Kota, Magetan',
                'coordinate' => '-7.6534, 111.3281',
            ],
            [
                'name' => 'Simpang Empat Pasar Baru Magetan',
                'address' => 'Jl. Mayjen Sukowati, Magetan',
                'coordinate' => '-7.6495, 111.3298',
            ],
            [
                'name' => 'Ruas Jalur Wisata Telaga Sarangan',
                'address' => 'Kecamatan Plaosan, Magetan',
                'coordinate' => '-7.6761, 111.2227',
            ],
            [
                'name' => 'Terminal Maospati Magetan',
                'address' => 'Jl. Raya Maospati - Madiun, Maospati',
                'coordinate' => '-7.5672, 111.4391',
            ],
            [
                'name' => 'Simpang Tiga Gorang-Gareng',
                'address' => 'Kecamatan Kawedanan, Magetan',
                'coordinate' => '-7.6812, 111.3912',
            ],
            [
                'name' => 'Simpang Empat Kraton',
                'address' => 'Jl. Diponegoro, Magetan',
                'coordinate' => '-7.6582, 111.3341',
            ],
            [
                'name' => 'Kawasan Perkantoran Pemkab Magetan',
                'address' => 'Jl. Basuki Rahmat, Magetan',
                'coordinate' => '-7.6521, 111.3265',
            ],
        ];

        foreach ($locations as $location) {
            Location::firstOrCreate(
                ['name' => $location['name']],
                [
                    'address' => $location['address'],
                    'coordinate' => $location['coordinate'],
                ]
            );
        }
    }
}