<?php

namespace App\Features\Maintenance\Models;

use App\Features\Inventory\Models\Inventory;
use App\Models\User;
use App\Support\Enums\ItemCondition;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
        'condition_before',
        'condition_after',
        'action_description',
        'action_taken',
        'issue_description',
    ];

    protected $casts = [
        'maintenance_date' => 'date',
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

    protected function actionDescription(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ?? $this->attributes['action_taken'] ?? $this->attributes['issue_description'] ?? '-'
        );
    }

    protected function officerDisplayName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->user?->name ?? $this->attributes['officer_name'] ?? '-'
        );
    }
}