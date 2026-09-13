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
                'name' => 'Jl. Yos Sudarso (Pusat Kota)',
                'address' => 'Kecamatan Magetan, Kabupaten Magetan',
                'coordinate' => '-7.6534, 111.3281',
            ],
            [
                'name' => 'Simpang Empat Pasar Baru Magetan',
                'address' => 'Jl. Jenderal Sudirman, Magetan',
                'coordinate' => '-7.6512, 111.3255',
            ],
            [
                'name' => 'Kawasan Wisata Telaga Sarangan',
                'address' => 'Kecamatan Plaosan, Kabupaten Magetan',
                'coordinate' => '-7.6761, 111.2227',
            ],
            [
                'name' => 'Terminal Purboyo Magetan',
                'address' => 'Jl. Mayjen Sukowati, Magetan',
                'coordinate' => '-7.6489, 111.3342',
            ],
            [
                'name' => 'Jl. Raya Maospati - Madiun',
                'address' => 'Kecamatan Maospati, Kabupaten Magetan',
                'coordinate' => '-7.5891, 111.4312',
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