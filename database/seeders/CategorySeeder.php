<?php

namespace Database\Seeders;

use App\Features\Category\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Rambu Lalu Lintas', 'description' => 'Rambu peringatan, larangan, perintah, dan petunjuk jalan'],
            ['name' => 'Lampu Penerangan Jalan Umum (PJU)', 'description' => 'Tiang, lampu LED, dan panel surya penerangan jalan'],
            ['name' => 'APILL (Traffic Light)', 'description' => 'Alat Pemberi Isyarat Lalu Lintas di persimpangan jalan'],
            ['name' => 'Traffic Cone', 'description' => 'Kerucut lalu lintas oranye pengatur rekayasa jalan'],
            ['name' => 'Road Barrier', 'description' => 'Pembatas jalan plastik dan beton pengaman jalur'],
            ['name' => 'Cermin Tikungan', 'description' => 'Cermin cembung tikungan tajam dan blind spot jalan'],
            ['name' => 'Halte Angkutan', 'description' => 'Fasilitas shelter dan tempat pemberhentian angkutan umum'],
            ['name' => 'Pagar Pengaman Jalan (Guardrail)', 'description' => 'Pagar pengaman baja untuk lereng dan jurang'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['name' => $cat['name']], $cat);
        }
    }
}