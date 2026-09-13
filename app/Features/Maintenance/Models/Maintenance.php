<?php

namespace App\Features\Maintenance\Models;

use App\Features\Inventory\Models\Inventory;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Maintenance extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_id',
        'user_id',
        'officer_name',
        'maintenance_date',
        'completion_date',
        'condition_before',
        'condition_after',
        'issue_description',
        'action_taken',
        'status',
    ];

    protected $casts = [
        'maintenance_date' => 'date',
        'completion_date' => 'date',
        'condition_before' => ItemCondition::class,
        'condition_after' => ItemCondition::class,
    ];

    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}