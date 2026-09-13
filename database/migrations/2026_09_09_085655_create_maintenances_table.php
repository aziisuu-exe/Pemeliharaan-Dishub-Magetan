<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inventory_id')->constrained('inventories')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete();
            $table->date('maintenance_date');
            $table->enum('condition_before', ['good', 'light_damage', 'heavy_damage']);
            $table->enum('condition_after', ['good', 'light_damage', 'heavy_damage']);
            $table->text('action_description');
            $table->decimal('cost', 15, 2)->nullable()->default(0);
            $table->string('officer_name');
            $table->timestamps();

            $table->index('maintenance_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};