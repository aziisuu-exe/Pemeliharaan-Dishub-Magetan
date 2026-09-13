<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete();
            $table->foreignId('location_id')->constrained('locations')->restrictOnDelete();
            $table->string('code')->unique();
            $table->string('name');
            $table->enum('condition', ['good', 'light_damage', 'heavy_damage'])->default('good');
            $table->unsignedInteger('quantity')->default(1);
            $table->string('unit')->default('unit');
            $table->year('procurement_year')->nullable();
            $table->text('specification')->nullable();
            $table->timestamps();

            $table->index('name');
            $table->index('condition');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};