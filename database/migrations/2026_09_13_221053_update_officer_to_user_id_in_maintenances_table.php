<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('maintenances', function (Blueprint $table) {
            if (!Schema::hasColumn('maintenances', 'user_id')) {
                $table->foreignId('user_id')->nullable()->after('inventory_id')->constrained('users')->nullOnDelete();
            }
            if (Schema::hasColumn('maintenances', 'officer_name')) {
                $table->dropColumn('officer_name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('maintenances', function (Blueprint $table) {
            $table->string('officer_name')->after('user_id');
            $table->dropConstrainedForeignId('user_id');
        });
    }
};